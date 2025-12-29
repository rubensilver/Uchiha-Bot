// src/utils/getUserName.ts
import type { CommandContext } from "../types/Command.js";

const nameCache = new Map<string, string>();

function sanitize(name: string): string {
  return name
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim()
    .slice(0, 30);
}

export function getUserName(msg: CommandContext["msg"]): string {
  const jid = msg.key?.participant || msg.key?.remoteJid;
  if (!jid) return "Usuário";

  // cache
  const cached = nameCache.get(jid);
  if (cached) return cached;

  let name =
    (msg as { pushName?: string }).pushName ||
    msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]?.split("@")[0] ||
    jid.split("@")[0];

  name = sanitize(name || "Usuário");

  nameCache.set(jid, name);
  return name;
}