// src/handlers/messageHandler.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { executeCommand } from "../commands/commandHandler";
import { PrefixManager } from "../core/PrefixManager";
import { handleAnti } from "../anti/AntiSystem";
import { handleMenu } from "../menus/menuHandler";

function extractText(msg: proto.IWebMessageInfo): string | null {
  const m = msg.message;
  if (!m) return null;
  if (m.conversation) return m.conversation;
  if (m.extendedTextMessage?.text) return m.extendedTextMessage.text;
  return null;
}

export function registerMessageHandler(sock: WASocket) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    for (const msg of messages) {
      if (!msg || !msg.message || !msg.key?.remoteJid) continue;
      if (msg.key?.fromMe) continue;

      // anti-system global (spam/blacklist) - se retorna true, ignora
      const ignore = await handleAnti(sock, msg as proto.IWebMessageInfo);
      if (ignore) continue;

      const text = extractText(msg as proto.IWebMessageInfo);
      if (!text) continue;

      const prefix = PrefixManager.getPrefix();
      if (!text.startsWith(prefix)) continue;

      const body = text.trim();
      const commandName = body.slice(prefix.length).split(/\s+/)[0].toLowerCase();
      const args = body.slice(prefix.length).split(/\s+/).slice(1);

      // menu has priority
      const menuHandled = await handleMenu(commandName, { sock, msg: msg as proto.IWebMessageInfo, prefix });
      if (menuHandled) continue;

      // execute command (handler fará permissões / admin router)
      const executed = await executeCommand(sock, msg as proto.IWebMessageInfo, commandName, args);
      if (!executed) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ Comando não encontrado.\nUse ${prefix}menu para ver os comandos.`
        });
      }
    }
  });
}
