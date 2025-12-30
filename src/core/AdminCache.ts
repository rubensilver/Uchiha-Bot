import { WASocket } from "@whiskeysockets/baileys";

type AdminCacheEntry = {
  admins: string[];
  botIsAdmin: boolean;
  expiresAt: number;
};

const CACHE = new Map<string, AdminCacheEntry>();

const TTL = 60 * 1000; // 60 segundos (igual projeto do teu amigo)

function normalizeJid(jid: string, participants: any[]): string {
  if (jid.includes("@lid")) {
    const found = participants.find(p => p.lid === jid);
    return found?.jid ?? jid;
  }
  return jid;
}

export async function getGroupAdminsCached(
  sock: WASocket,
  groupJid: string
) {
  const now = Date.now();
  const cached = CACHE.get(groupJid);

  if (cached && cached.expiresAt > now) {
    return cached;
  }

  const metadata = await sock.groupMetadata(groupJid);
  const participants = metadata.participants;

  const admins = participants
    .filter(p => p.admin)
    .map(p => normalizeJid(p.id, participants));

  const botJid = normalizeJid(sock.user!.id, participants);

  const entry: AdminCacheEntry = {
    admins,
    botIsAdmin: admins.includes(botJid),
    expiresAt: now + TTL
  };

  CACHE.set(groupJid, entry);
  return entry;
}

export function clearGroupAdminCache(groupJid: string) {
  CACHE.delete(groupJid);
}
