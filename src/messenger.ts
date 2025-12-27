// src/messenger.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { getUserName } from "./utils/getUserName";
import { getPermissions } from "./utils/getPermissions";
import { executeCommand } from "./core/commandHandler";
import { CommandContext } from "./types/Command";
import { handleMenu } from "./menus/menuHandler";
import { PrefixManager } from "./core/PrefixManager";
import { handleAnti } from "./anti/AntiSystem";
import { OWNER } from "./config/conf";

/**
 * Handler principal de mensagens
 */
export async function handleMessage(
  sock: WASocket,
  msg: proto.IWebMessageInfo
) {
  try {
    if (!msg.message || !msg.key?.remoteJid) return;
if (msg.key?.fromMe) return;
if (msg.key?.remoteJid === "status@broadcast") return;

    const text = extractMessageText(msg);
    if (!text) return;

const { isAdmin, isOwner } = await getPermissions(sock, msg);

    // AntiSystem
    if (!isOwner) {
      const shouldIgnore = await handleAnti(sock, msg);
      if (shouldIgnore) return;
    }

    const prefix = PrefixManager.getPrefix();
    if (!text.startsWith(prefix)) return;

    const body = text.trim();
    const commandName = body
      .slice(prefix.length)
      .split(/\s+/)[0]
      .toLowerCase();

    const args = body
      .slice(prefix.length)
      .split(/\s+/)
      .slice(1);

    const menuHandled = await handleMenu(commandName, {
      sock,
      msg,
      prefix,
    });
    if (menuHandled) return;

    const jid = msg.key!.remoteJid!;
const user = msg.key!.participant || jid;


const ctx: CommandContext = {
  sock,
  msg,
  args,

  userJid: user,
  userName: getUserName(msg),
  isAdmin,
  isOwner,

  reply: async (text: string) => {
    await sock.sendMessage(jid, { text });
  },

  mention: async (text: string) => {
    await sock.sendMessage(jid, {
      text,
      mentions: [user],
    });
  },
};

const executed = await executeCommand(sock, msg, commandName, args);
    if (!executed) {
      await sendReply(
        sock,
        msg,
        `❌ Comando \`${commandName}\` não encontrado!`
      );
    }
  } catch (error) {
    console.error("❌ Erro ao processar mensagem:", error);
  }
}

/**
 * Extrai o texto de uma mensagem
 */
function extractMessageText(msg: proto.IWebMessageInfo): string | null {
  const message = msg.message;
  if (!message) return null;

  if (message.conversation) return message.conversation;
  if (message.extendedTextMessage?.text) return message.extendedTextMessage.text;

  return null;
}

/**
 * Verifica se a mensagem é do dono
 */
function isMessageFromOwner(msg: proto.IWebMessageInfo): boolean {
  const sender = msg.key?.remoteJid || "";
  return OWNER.numbers.some((num: string) => sender.includes(num));
}

/**
 * Responder uma mensagem
 */
export async function sendReply(
  sock: CommandContext["sock"],
  msg: CommandContext["msg"],
  text: string
) {
  const jid = msg.key?.remoteJid;
  if (!jid) return;

  await sock.sendMessage(jid, { text });
}

/**
 * Registrar handler de mensagens
 */
export function registerMessageHandler(sock: WASocket) {
  sock.ev.on(
    "messages.upsert",
    async (update: { messages: proto.IWebMessageInfo[] }) => {
      for (const msg of update.messages) {
        await handleMessage(sock, msg);
      }
    }
  );
}