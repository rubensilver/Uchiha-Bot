import type { CommandContext } from "../types/Command.js";
import { normalizeJid } from "./normalizeJid.js";

export async function getPermissions(
  sock: CommandContext["sock"],
  msg: CommandContext["msg"]
) {
  const jid = msg.key?. remoteJid;

  if (!jid || !jid.endsWith("@g.us") || !sock.user || !msg.key?. participant) {
    return {
      isGroup: false,
      senderIsAdmin: false,
      botIsAdmin: false
    };
  }

  const metadata = await sock.groupMetadata(jid);
  const participants = metadata.participants;

  // ✅ CORRIGIDO: Usa normalizeJid centralizado
  const senderJid = normalizeJid(
    msg.key.participant,
    participants
  );

  const botJid = normalizeJid(
    sock.user. id,
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