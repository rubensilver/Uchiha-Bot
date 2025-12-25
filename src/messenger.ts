// src/messenger.ts  (AJUSTE FINAL – ligação correta, sem duplicar lógica)

import { WASocket } from "@whiskeysockets/baileys";
import { handleMenu } from "./menus/menuHandler";
import { PrefixManager } from "./core/PrefixManager";
import { handleAnti } from "./anti/AntiSystem";
import { handleCommand } from "./core/commandHandler";

export function registerMessageHandler(sock: WASocket) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg || !msg.message || !msg.key?.remoteJid) return;

    await handleAnti(sock, msg);

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text;

    if (!text) return;

    const prefix = PrefixManager.getPrefix();
    if (!text.startsWith(prefix)) return;

    const body = text.trim();
    const commandName = body
      .slice(prefix.length)
      .split(/\s+/)[0]
      .toLowerCase();

    const menuHandled = await handleMenu(commandName, {
      sock,
      msg,
      prefix
    });

    if (menuHandled) return;

    await handleCommand(sock, msg, body);
  });
}