import type { CommandContext } from "../types/Command";
import { OWNER } from "../config/conf";

export async function getPermissions(
  sock: CommandContext["sock"],
  msg: CommandContext["msg"]
) {
  const jid = msg.key?.remoteJid!;
  const user = msg.key?.participant || jid;

  const isOwner = OWNER.numbers.some(n => user.includes(n));

  let isAdmin = false;

  if (jid.endsWith("@g.us")) {
    const meta = await sock.groupMetadata(jid);
    type Participant = { id: string; admin?: string | null };

const metadata = await sock.groupMetadata(jid);

const isAdmin = metadata.participants.some(
  (p: Participant) => p.id === user && p.admin != null
);
}

  return { isAdmin, isOwner };
}
