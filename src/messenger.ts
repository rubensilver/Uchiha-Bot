import { WASocket, proto } from "@whiskeysockets/baileys";
import { executeCommand, listCommands } from "../core/commandHandler";
import { CommandContext } from "../types/Command"; // Verifique se o caminho está correto
import { handleMenu } from "../menus/menuHandler";
import { PrefixManager } from "./PrefixManager";
import { handleAnti } from "../anti/AntiSystem";
import { OWNER } from "../config/conf";

/**
 * Handler principal de mensagens
 */
export async function handleMessage(
  sock: WASocket,
  msg: proto.IWebMessageInfo
) {
  try {
    // Verificações básicas
    if (!msg.message || !msg.key?.remoteJid) return; // Corrigido o espaço extra

    const isOwner = isMessageFromOwner(msg);

    // Extrair texto da mensagem
    const text = extractMessageText(msg);
    if (!text) return;

    // Aplicar sistema anti (spam, etc)
    if (!isOwner) {
      const shouldIgnore = await handleAnti(sock, msg);
      if (shouldIgnore) return;
    }

    // Obter prefix
    const prefix = PrefixManager.getPrefix();

    // Verificar se começa com prefix
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

    // Tentar tratar como menu primeiro
    const menuHandled = await handleMenu(commandName, {
      sock,
      msg,
      prefix,
    });

    if (menuHandled) return;

    // Criar contexto do comando
    const ctx: CommandContext = {
      sock,
      msg,
      args,
    };

    // Executar comando
    const executed = await executeCommand(commandName, ctx);

    if (!executed) {
      // Responder que comando não foi encontrado (opcional)
      await sendReply(sock, msg, `❌ Comando \`${commandName}\` não encontrado!`);
    }
  } catch (error) {
    console.error("❌ Erro ao processar mensagem:", error);
  }
}

/**
 * Extrai o texto de uma mensagem (suporta vários tipos)
 */
function extractMessageText(msg: proto.IWebMessageInfo): string | null {
  const message = msg.message;
  if (!message) return null;

  // Mensagem de texto normal
  if (message.conversation) {
    return message.conversation;
  }

  // Mensagem de texto estendida
  if (message.extendedTextMessage?.text) { // Corrigido o espaço extra
    return message.extendedTextMessage.text;
  }

  return null;
}

/**
 * Verifica se a mensagem é do dono
 */
function isMessageFromOwner(msg: proto.IWebMessageInfo): boolean {
  const sender = msg.key?.remoteJid || ""; // Corrigido o espaço extra
  return OWNER.numbers.some((num) => sender.includes(num));
}

/**
 * Responder uma mensagem
 */
export async function sendReply(
  sock: WASocket,
  msg: proto.IWebMessageInfo,
  text: string
) {
  const jid = msg.key?.remoteJid;
  if (!jid) return;

  await sock.sendMessage(jid, {
    text,
  });
}

/**
 * Registrar handler de mensagens
 */
export function registerMessageHandler(sock: WASocket) {
  sock.ev.on("messages.upsert", async ({ messages }) => { // Corrigido o espaço extra
    for (const msg of messages) {
      await handleMessage(sock, msg);
    }
  });
}
