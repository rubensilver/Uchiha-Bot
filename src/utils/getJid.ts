// src/utils/getJid.ts
import type { CommandContext } from "../types/Command";

export function getJid(ctx: CommandContext): string {
  const jid = ctx.msg.key?.remoteJid;
  if (!jid) return "";
  return jid;
}
