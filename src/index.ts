import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from "baileys";

import * as fs from "fs";
import * as path from "path";

import { menuCompleto } from "./menus/menuCompleto";
import { menuBot } from "./menus/menuBot";
import menuADM from "./menus/menuADM";
import { AdminConfig } from "./admin/AdminConfig";
import { handleCommand } from "./commands/commandHandler";
import { run as runMenuVip } from "./menus/menuVip";
import { run as runMenuJogos } from "./menus/menuJogos";

async function connectBot() {
  const authFolder = path.join(__dirname, "../auth");
  if (!fs.existsSync(authFolder)) {
    fs.mkdirSync(authFolder, { recursive: true });
  }

  const { state, saveCreds } = await useMultiFileAuthState(authFolder);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    browser: ["UchihaBot", "Chrome", "1.0"],
    markOnlineOnConnect: false,
    syncFullHistory: false
  });

  sock.ev.on("creds.update", saveCreds);

  let pairingDone = false;

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "open") {
  console.log("✅ Socket aberto");

  setTimeout(async () => {
    if (!sock.authState.creds.registered && !pairingDone) {
      pairingDone = true;

      try {
        const code = await sock.requestPairingCode("244926824485"); // teu número
        console.log("\n==============================");
        console.log("🔗 PAIRING CODE:", code);
        console.log("==============================\n");
      } catch (err) {
        console.error("❌ Erro ao gerar pairing:", err);
      }
    }
  }, 7000); // ⏳ 7 segundos (IMPORTANTE NO CELULAR)
}

    if (connection === "close") {
      const reason = (lastDisconnect?.error as any)?.output?.statusCode;
      console.log("⚠ Conexão fechada:", reason);

      if (reason === DisconnectReason.loggedOut) {
        console.log("❌ Sessão removida. Apague a pasta auth.");
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0];
    if (!m?.message) return;
    if (m.key.fromMe) return;
    if (m.key.remoteJid === "status@broadcast") return;

    const from = m.key.remoteJid!;
    const body =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      "";

    if (!body) return;

    const prefix = AdminConfig.getAll().prefixes?.[0] ?? "!";
    const cmd = body.toLowerCase().trim();

    if (cmd === `${prefix}menu`) {
      return sock.sendMessage(from, {
        text: menuCompleto({
          hora: new Date().toLocaleTimeString("pt-BR"),
          data: new Date().toLocaleDateString("pt-BR"),
          usuario: m.pushName || "Usuário",
          version: "10.0.1",
          dono: "Rúben Silver",
          prefix
        })
      });
    }

    if (cmd === `${prefix}menu-bot`) {
      return sock.sendMessage(from, { text: menuBot(prefix) });
    }

    if (cmd === `${prefix}menu-adm`) {
      return sock.sendMessage(from, { text: menuADM(prefix) });
    }

    if (cmd === `${prefix}ping`) {
      return sock.sendMessage(from, { text: "Pong!" });
    }

    if (cmd.includes("vip")) {
      return runMenuVip(sock, m);
    }

    if (cmd.includes("jogos")) {
      return runMenuJogos(sock, m, prefix);
    }

    await handleCommand(sock, m, body);
  });
}

connectBot();