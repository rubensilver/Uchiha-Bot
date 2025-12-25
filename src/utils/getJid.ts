// src/utils/getJid.ts
import { proto } from "@whiskeysockets/baileys";

export function getJid(m: proto.IWebMessageInfo): string {
  if (!m.key?.remoteJid) {
    throw new Error("Mensagem sem remoteJid");
  }
  return m.key?.remoteJid;
}
