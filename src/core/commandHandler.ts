// src/core/commandHandler.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { executeCommand } from "../commands/commandHandler";
import { PrefixManager } from "../core/PrefixManager";

/**
 * Função que o messenger.ts já chama: handleCommand(sock, msg, body)
 * Ela parseia o body (usa o PrefixManager) e delega para commands/commandHandler.executeCommand
 */
export async function handleCommand(sock: WASocket, msg: proto.IWebMessageInfo, body: string) {
  try {
    const prefix = PrefixManager.getPrefix();
    const text = body.trim();
    const noPrefix = text.startsWith(prefix) ? text.slice(prefix.length) : text;
    const parts = noPrefix.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    await executeCommand(sock, msg, commandName, args);
  } catch (err) {
    console.error("❌ Erro em core/handleCommand:", err);
    const jid = msg.key?.remoteJid;
    if (jid) {
      try {
        await sock.sendMessage(jid, { text: `⚠️ *Erro interno do handler*\n\n🌑 *"O Sharingan encontra falhas, informe o dono."*` });
      } catch {}
    }
  }
}
