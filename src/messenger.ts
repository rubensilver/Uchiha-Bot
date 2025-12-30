// src/messenger.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { BotRepo } from "./database/repositories/BotRepo.js";
import { clearGroupAdminCache } from "./core/AdminCache.js";
import { executeCommand } from "./core/commandHandler.js";
import { handleCommand } from "./commands/commandHandler.js";
import { handleMenu } from "./menus/menuHandler.js";
import { PrefixManager } from "./core/PrefixManager.js";
import { handleAnti } from "./anti/AntiSystem.js";

function jidToNumber(jid?: string | null): string | null {
  if (!jid) return null;
  return jid.split("@")[0].split(":")[0];
}

export async function handleMessage(
  sock: WASocket,
  msg: proto.IWebMessageInfo
) {
  try {
    if (!msg.message || !msg.key?.remoteJid) return;
    if (msg.key.fromMe) return;
    if (msg.key.remoteJid === "status@broadcast") return;

    const from = msg.key.remoteJid;

    if (from.endsWith("@g.us")) {
      const metadata = await sock.groupMetadata(from);

      const botNumber = jidToNumber(sock.user?.id);

      const botParticipant = metadata.participants.find(
        p => jidToNumber(p.id) === botNumber
      );

      console.log("🤖 BOT PARTICIPANT:", botParticipant);
    }

    console.log("📩 JID RECEBIDO:", from);

    const text = extractMessageText(msg);
    if (!text) return;

    const blocked = await handleAnti(sock, msg);
    if (blocked) return;

    const prefix = PrefixManager.getPrefix();
    if (!text.startsWith(prefix)) return;

    const body = text.slice(prefix.length).trim();
    if (!body) return;

    const parts = body.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const menuHandled = await handleMenu(commandName, {
      sock,
      msg,
      prefix,
    });
    if (menuHandled) return;

    const allowed = await executeCommand(
      sock,
      msg,
      commandName,
      args
    );

    if (!allowed) {
      await sendReply(
        sock,
        msg,
        `❌ Comando \`${commandName}\` não encontrado!`
      );
      return;
    }

    await handleCommand(sock, msg, commandName, args);

  } catch (error) {
    console.error("❌ Erro ao processar mensagem:", error);
  }
}

function extractMessageText(
  msg: proto.IWebMessageInfo
): string | null {
  const message = msg.message;
  if (!message) return null;

  if (message.conversation) return message.conversation;
  if (message.extendedTextMessage?.text)
    return message.extendedTextMessage.text;

  return null;
}

async function sendReply(
  sock: WASocket,
  msg: proto.IWebMessageInfo,
  text: string
) {
  const jid = msg.key?.remoteJid;
  if (!jid) return;

  await sock.sendMessage(jid, { text });
}

export function registerMessageHandler(sock: WASocket) {
  
  sock.ev.on("messages.upsert", async ({ messages }) => {
    for (const msg of messages) {
      await handleMessage(sock, msg);
    }
  });
      sock.ev.on("group-participants.update", async (ev) => {
        clearGroupAdminCache(ev.id);
      });
      
    }