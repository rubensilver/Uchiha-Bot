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
  const metadata = await sock.groupMetadata(jid);

  isAdmin = metadata.participants.some(
    (p: { id: string; admin?: string | null }) =>
      p.id === user && p.admin != null
  );
}

return { isAdmin, isOwner };
}