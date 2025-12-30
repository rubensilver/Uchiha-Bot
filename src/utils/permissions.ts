import type { CommandContext } from "../types/Command.js";
import { normalizeJid } from "./normalizeJid.js";

export async function checkAdmin(
  sock: CommandContext["sock"],
  msg: CommandContext["msg"]
) {
  const groupJid = msg.key?.remoteJid;
  if (!groupJid || !groupJid.endsWith("@g.us")) {
    return {
      isGroup: false,
      senderIsAdmin: false,
      botIsAdmin: false
    };
  }

  if (!sock.user || !msg.key?.participant) {
    return {
      isGroup: true,
      senderIsAdmin:  false,
      botIsAdmin:  false
    };
  }

  const metadata = await sock.groupMetadata(groupJid);
  const participants = metadata.participants;

  // ✅ CORRIGIDO: Usa normalizeJid centralizado
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