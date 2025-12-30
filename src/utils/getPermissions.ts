// src/utils/getPermissions.ts
import type { CommandContext } from "../types/Command.js";

function normalizeJid(jid: string, participants: any[]): string {
  if (jid.includes("@lid")) {
    const found = participants.find(p => p.lid === jid);
    return found?.jid ?? jid;
  }
  return jid;
}

export async function getPermissions(
  sock: CommandContext["sock"],
  msg: CommandContext["msg"]
) {
  const jid = msg.key?.remoteJid;

  if (!jid || !jid.endsWith("@g.us") || !sock.user || !msg.key?.participant) {
    return {
      isGroup: false,
      senderIsAdmin: false,
      botIsAdmin: false
    };
  }

  const metadata = await sock.groupMetadata(jid);
  const participants = metadata.participants;

  const senderJid = normalizeJid(
    msg.key.participant,
    participants
  );

  const botJid = normalizeJid(
    sock.user.id,
    participants
  );

  const admins = participants
    .filter(p => p.admin)
    .map(p => normalizeJid(p.id, participants));

  return {
    isGroup: true,
    senderIsAdmin: admins.includes(senderJid),
    botIsAdmin: admins.includes(botJid)
  };
}