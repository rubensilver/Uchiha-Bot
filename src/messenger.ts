// src/messenger.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { executeCommand } from "./core/commandHandler";
import { handleCommand } from "./commands/commandHandler";
import { handleMenu } from "./menus/menuHandler";
import { PrefixManager } from "./core/PrefixManager";
import { handleAnti } from "./anti/AntiSystem";

/**

Handler principal de mensagens
*/
export async function handleMessage(
sock: WASocket,
msg: proto.IWebMessageInfo
) {
try {
if (!msg.message || !msg.key?.remoteJid) return;
if (msg.key.fromMe) return;
if (msg.key.remoteJid === "status@broadcast") return;

const text = extractMessageText(msg);
if (!text) return;

// AntiSystem (executa antes de comandos)
const blocked = await handleAnti(sock, msg);
if (blocked) return;

const prefix = PrefixManager.getPrefix();
if (!text.startsWith(prefix)) return;

const body = text.slice(prefix.length).trim();
const parts = body.split(/\s+/);

const commandName = parts[0].toLowerCase();
const args = parts.slice(1);

// ✅ MENU PRIMEIRO
const menuHandled = await handleMenu(commandName, {
sock,
msg,
prefix,
});
if (menuHandled) return;

// ✅ CORE valida permissão
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
`❌ Comando \`${commandName}\` não encontrado!`);
return;
}

// ✅ COMMANDS executa
await handleCommand(sock, msg, commandName, args);


} catch (error) {
console.error("❌ Erro ao processar mensagem:", error);
}
}

/**

Extrai texto da mensagem
*/
function extractMessageText(msg: proto.IWebMessageInfo): string | null {
const message = msg.message;
if (!message) return null;


if (message.conversation) return message.conversation;
if (message.extendedTextMessage?.text)
return message.extendedTextMessage.text;

return null;
}

/**

Responder mensagem
*/
async function sendReply(
sock: WASocket,
msg: proto.IWebMessageInfo,
text: string
) {
const jid = msg.key?.remoteJid;
if (!jid) return;


await sock.sendMessage(jid, { text });
}

/**

Registrar listener
*/
export function registerMessageHandler(sock: WASocket) {
sock.ev.on(
"messages.upsert",
async ({ messages }) => {
for (const msg of messages) {
await handleMessage(sock, msg);
}
}
);
}
