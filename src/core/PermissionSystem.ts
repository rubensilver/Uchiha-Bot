import { WASocket, proto } from "@whiskeysockets/baileys";
import { OWNER } from "../config/conf";

/**
 * Níveis de permissão do sistema
 */
export type PermissionLevel =
  | "user"
  | "admin"
  | "vip"
  | "premium"
  | "owner"
  | "bot";

export class PermissionSystem {

  /** É o BOT (super permissão) */
  static isBot(msg: proto.IWebMessageInfo): boolean {
    return msg.key?.fromMe === true;
  }

  /** Dono do bot */
  static isOwner(msg: proto.IWebMessageInfo): boolean {
    const sender =
      msg.key?.participant || msg.key?.remoteJid || "";
    return OWNER.numbers.some(n => sender.includes(n));
  }

  /** VIP (exemplo: futuramente via DB) */
  static isVip(_msg: proto.IWebMessageInfo): boolean {
    return false; // placeholder (sem restrição)
  }

  /** PREMIUM (exemplo: futuramente via DB) */
  static isPremium(_msg: proto.IWebMessageInfo): boolean {
    return false; // placeholder (sem restrição)
  }

  /** É grupo */
  static isGroup(jid: string): boolean {
    return jid.endsWith("@g.us");
  }

  /** Admin do grupo */
  static async isGroupAdmin(
    sock: WASocket,
    msg: proto.IWebMessageInfo
  ): Promise<boolean | null> {
    const jid = msg.key?.remoteJid;
    const user =
  msg.key?.participant || msg.key?.remoteJid;

    if (!jid || !user) return false;
    if (!this.isGroup(jid)) return false;

    try {
      const meta = await sock.groupMetadata(jid);
      return (
        meta.participants?.some(
          (p: { id: string; admin?: string | null }) =>
            p.id === user && !!p.admin
        ) ?? false
      );
    } catch {
      return null;
    }
  }

  /** Verificação central de permissão */
  static async checkPermission(
    sock: WASocket,
    msg: proto.IWebMessageInfo,
    required: PermissionLevel
  ): Promise<boolean> {

    const jid = msg.key?.remoteJid || "";

    // 🔥 BOT pode tudo
    if (this.isBot(msg)) return true;

    // 🔥 Owner pode tudo
    if (this.isOwner(msg)) return true;

    // VIP e PREMIUM (sem restrição por enquanto)
    if (required === "vip") return true;
    if (required === "premium") return true;

    // Owner-only
    if (required === "owner") return false;

    // Admin
    if (required === "admin") {
      if (this.isGroup(jid)) {
        const isAdmin = await this.isGroupAdmin(sock, msg);

 // erro técnico → NÃO bloqueia comando
      if (isAdmin === null) {
        return true;
      }

         return isAdmin;
  }

  return false;
}

// User padrão
return true;
  }
}
