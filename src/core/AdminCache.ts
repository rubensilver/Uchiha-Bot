import { WASocket } from "@whiskeysockets/baileys";
import { normalizeJid } from "../utils/normalizeJid.js";

type AdminCacheEntry = {
  admins: string[];
  botIsAdmin: boolean;
  expiresAt: number;
};

const CACHE = new Map<string, AdminCacheEntry>();
const TTL = 60 * 1000; // 60 segundos

export async function getGroupAdminsCached(
  sock: WASocket,
  groupJid: string
) {
  const now = Date.now();
  const cached = CACHE.get(groupJid);

  // ✅ Cache ainda é válido? 
  if (cached && cached.expiresAt > now) {
    return cached;
  }

  const metadata = await sock.groupMetadata(groupJid);
  const participants = metadata.participants;

  // ✅ CORRIGIDO: Normaliza cada admin
  const admins = participants
    .filter(p => p.admin)
    .map(p => normalizeJid(p.id, participants));

  // ✅ CORRIGIDO:  Normaliza bot JID com participants
  const botJid = normalizeJid(sock.user!.id, participants);

  console.log("👁️ [DEBUG-ADMIN-CACHE]", {
    botJid,
    botExists: admins.includes(botJid),
    allAdmins: admins,
    participants: participants.map(p => ({ id: p.id, admin: p.admin }))
  });

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