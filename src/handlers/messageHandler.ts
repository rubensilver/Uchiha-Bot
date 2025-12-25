import { WASocket, proto } from "@whiskeysockets/baileys";
import { executeCommand } from "../core/commandHandler";
import { PrefixManager } from "../core/PrefixManager";
import { handleAnti } from "../anti/AntiSystem";
import { handleMenu } from "../menus/menuHandler";

/**
 * Handler principal de mensagens - LIGA TUDO AQUI
 */
export async function handleMessage(
  sock:  WASocket,
  msg: proto.IWebMessageInfo
) {
  try {
    // ✅ Validações básicas
    if (!msg.message || !msg.key?.remoteJid) return;

    const jid = msg.key.remoteJid;
    const text = extractMessageText(msg);

    if (!text) return;

    // ✅ Sistema anti (spam, bloqueios)
    const shouldIgnore = await handleAnti(sock, msg);
    if (shouldIgnore) return;

    // ✅ Obter prefix
    const prefix = PrefixManager.getPrefix();

    // ✅ Se não começa com prefix, ignorar
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

    // ✅ Tentar tratar como menu primeiro
    const menuHandled = await handleMenu(commandName, {
      sock,
      msg,
      prefix,
    });

    if (menuHandled) return;

    // ✅ Executar comando com permissões
    const executed = await executeCommand(sock, msg, commandName, args);

    if (!executed) {
      // Comando não existe
      await sock.sendMessage(jid, {
        text: `❌ *Comando não encontrado*\n\n👁️ Use o prefixo "${prefix}menu" para ver os comandos disponíveis.\n\n🌑 *"Os fracos se perdem na escuridão."*`
      });
    }
  } catch (error) {
    console.error("❌ Erro ao processar mensagem:", error);
  }
}

/**
 * Extrai texto de qualquer tipo de mensagem
 */
function extractMessageText(msg: proto.IWebMessageInfo): string | null {
  const message = msg.message;
  if (!message) return null;

  if (message.conversation) {
    return message.conversation;
  }

  if (message.extendedTextMessage?.text) {
    return message.extendedTextMessage.text;
  }

  return null;
}

/**
 * Registra o handler na conexão
 */
export function registerMessageHandler(sock: WASocket) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    for (const msg of messages) {
      // Ignorar mensagens do próprio bot
      if (msg.key?.fromMe) continue;

      await handleMessage(sock, msg);
    }
  });
}
