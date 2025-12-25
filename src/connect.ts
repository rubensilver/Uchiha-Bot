// src/connect.ts
import makeWASocket, {
  Browsers,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  WASocket
} from "@whiskeysockets/baileys";

import P from "pino";
import fs from "fs";
import path from "path";
import readline from "readline";
import colors from "colors";

// (APENAS A PARTE RELEVANTE - resto mantém como está)

import { loadCommands } from "./commands/loader";
import { registerMessageHandler } from "./handlers/messageHandler"; // ✅ MUDAR AQUI
import { BOT_NUMBER } from "./config/settings";
import { AntiLigarState } from "./state/AntiLigarState";

export async function connect(): Promise<WASocket> {
  // 🔥 CARREGA COMANDOS ANTES DE TUDO
  loadCommands();

}
let reconnecting = false;

/* ================== READLINE ================== */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (text: string): Promise<string> =>
  new Promise(resolve => rl.question(text, resolve));

/* ================== CONNECT ================== */
export async function connect(): Promise<WASocket> {
  // 🔥 CARREGA COMANDOS UMA ÚNICA VEZ
  loadCommands();

  const authDir = path.resolve("auth");

  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,

    emitOwnEvents: false,
    syncFullHistory: false,
    markOnlineOnConnect: false,

    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Safari")
  });

  /* ================== CREDS ================== */
  sock.ev.on("creds.update", saveCreds);

  /* ================== ANTI-LIGAR (LÓGICA REAL) ================== */
  sock.ev.on("call", async (calls) => {
    if (!AntiLigarState.enabled) return;

    for (const call of calls) {
      if (call.status !== "offer") continue;

      try {
        await sock.rejectCall(call.id, call.from);

        await sock.sendMessage(call.from, {
          text: `🛡️ *Ligação bloqueada*

🔥 *“O Clã Uchiha não atende chamadas.”*`
        });
      } catch {}
    }
  });

  /* ================== MENSAGENS ================== */
  registerMessageHandler(sock);

  /* ================== PAIRING ================== */
  if (!sock.authState.creds.registered) {
    setTimeout(async () => {
      try {
        console.log(
          colors.cyan("\nNenhuma sessão encontrada. Vamos conectar seu número.\n")
        );

        let number = BOT_NUMBER;

        if (!number) {
          number = await question(
            colors.yellow("Digite seu número (ex: 5593999999999): ")
          );
        }

        number = number.replace(/\D/g, "");

        console.log(colors.gray("\nGerando código de pareamento...\n"));

        const code = await sock.requestPairingCode(number);

        console.log(
          colors.cyan(
            `📲 Seu código de pareamento:\n\n${colors.white(code)}\n`
          )
        );

        rl.close();
      } catch (err) {
        console.log(
          colors.red("\n❌ Erro ao gerar código de pareamento:\n"),
          err
        );
      }
    }, 1200);
  }

  /* ================== CONEXÃO ================== */
  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      reconnecting = false;
      console.log(colors.green("〔 BOT CONECTADO COM SUCESSO 〕"));
    }

    if (connection === "close") {
      const reason =
        (lastDisconnect?.error as any)?.output?.statusCode;

      if (reason && ![515].includes(reason)) {
        console.log(
          colors.yellow(`[CONEXÃO FECHADA] Motivo: ${reason}`)
        );
      }

      if (reason === DisconnectReason.loggedOut) {
        console.log(
          colors.red("❌ Sessão desconectada. Limpando auth...")
        );

        fs.rmSync(authDir, { recursive: true, force: true });

        console.log(
          colors.red("⏳ Aguardando 5 segundos antes de reconectar...")
        );

        setTimeout(() => connect(), 5000);
        return;
      }

      if (!reconnecting) {
        reconnecting = true;

        setTimeout(() => {
          reconnecting = false;
          connect();
        }, 2500);
      }
    }
  });

  return sock;
}
