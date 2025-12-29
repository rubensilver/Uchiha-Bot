import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  Browsers,
  DisconnectReason,
  WASocket,
  ConnectionState
} from "@whiskeysockets/baileys";

import pino from "pino";
import fs from "fs";
import path from "path";
import readline from "readline";
import colors from "colors";

import { startDatabase } from "./database/index.js";
import { saveDB } from "./core/db.js";
import { loadCommands } from "./commands/loader.js";
import { registerMessageHandler } from "./messenger.js";
import { BOT_NUMBER } from "./config/settings.js";
import { registerAntiLigar } from "./anti/antiLigar.js";
import { debug } from "./utils/debug.js";

/* ================== READLINE ================== */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (text: string): Promise<string> =>
  new Promise((resolve) => rl.question(text, resolve));

/* ================== CONNECT ================== */
export async function connect(): Promise<WASocket> {
  const authDir = path.resolve("auth");

  // 1. Verifica se a sessão existe, se for inválida (erro anterior), limpa para forçar novo login
  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  const { version } = await fetchLatestBaileysVersion();

  debug("Criando socket WhatsApp");

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino.default({ level: "silent" }),
    printQRInTerminal: false,
    // Importante: Browser deve ser este formato para Pairing Code funcionar sempre
    browser: ["Ubuntu", "Chrome", "20.0.04"],
  });

process.on("SIGINT", () => {
  saveDB();
  process.exit();
});

process.on("SIGTERM", () => {
  saveDB();
  process.exit();
});

  // 2. SOLICITAÇÃO DE PAIRING CODE (Fora do connection.update)
  // Se não estiver registrado, ele pede o código imediatamente
  if (!sock.authState.creds.registered) {
    let number = BOT_NUMBER?.replace(/\D/g, "");

    if (!number) {
      number = await question(
        colors.yellow("\nDigite seu número com DDD (ex: 5593999999999): ")
      );
      number = number.replace(/\D/g, "");
    }

    // Pequeno delay para garantir estabilidade do socket
    setTimeout(async () => {
      try {
        const code = await sock.requestPairingCode(number);
        console.log(colors.cyan("\n--- CONEXÃO VIA CÓDIGO ---"));
        console.log(colors.green(`📲 Seu código de pareamento é: `), colors.white.bold(code));
        console.log(colors.cyan("---------------------------\n"));
      } catch (err) {
        console.error(colors.red("❌ Erro ao gerar código de pareamento:"), err);
      }
    }, 3000);
  }

  sock.ev.on("creds.update", saveCreds);

  let systemsLoaded = false;

  sock.ev.on(
    "connection.update",
    async ({ connection, lastDisconnect }: Partial<ConnectionState>) => {
      const status = (lastDisconnect?.error as any)?.output?.statusCode;

      if (connection === "open") {
        console.log(colors.green("✅ Conexão estabelecida com sucesso!"));
        
        if (!systemsLoaded) {
          systemsLoaded = true;
          await startDatabase();
          await loadCommands();
          registerMessageHandler(sock);
          registerAntiLigar(sock);
          debug("Sistemas carregados");
        }
      }

      if (connection === "close") {
  saveDB(); // ✅ CRÍTICO
  console.log(colors.red(`❌ Conexão fechada. Motivo: ${status}`));

        // 3. SE O ERRO FOR 401 (Sessão expirada/inválida), APAGA A PASTA E REINICIA
        if (status === DisconnectReason.loggedOut || status === 401) {
          console.log(colors.yellow("Sessão inválida. Limpando cache e reiniciando..."));
          fs.rmSync(authDir, { recursive: true, force: true });
          setTimeout(() => connect(), 2000);
        } else {
          // Outros erros: Apenas tenta reconectar
          setTimeout(() => connect(), 3000);
        }
      }
    }
  );

  return sock;
}
