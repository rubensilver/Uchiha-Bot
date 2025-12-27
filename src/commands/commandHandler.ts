// src/commands/commandHandler.ts

import { WASocket, proto } from "@whiskeysockets/baileys";
import { getPermissions } from "../utils/getPermissions";
import { getUserName } from "../utils/getUserName";
import { Command } from "../types/Command";

const commands = new Map<string, Command>();

// usado pelo loader
export function registerCommand(cmd: Command) {
  commands.set(cmd.meta.name, cmd);

  if (cmd.meta.alias) {
    for (const a of cmd.meta.alias) {
      commands.set(a, cmd);
    }
  }
}

// usado pelo core (se existir)
export function getCommand(name: string): Command | undefined {
  return commands.get(name);
}

// usado pelo messenger.ts
export async function handleCommand(
  sock: WASocket,
  msg: proto.IWebMessageInfo,
  body: string
) {
  // REMOVE qualquer lógica de prefixo daqui
  const parts = body.trim().split(/\s+/);
  const name = parts[0].toLowerCase(); // ✅ NÃO remove prefixo aqui
  const args = parts.slice(1);

  const cmd = commands.get(name);
  if (!cmd) return;

  const jid = msg.key!.remoteJid!;
const user = msg.key!.participant || jid;

const { isAdmin, isOwner } = await getPermissions(sock, msg);

await cmd.run({
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
});
}