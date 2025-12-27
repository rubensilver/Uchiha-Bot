// src/core/PermissionSystem.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { OWNER } from "../config/conf";

export type PermissionLevel = "user" | "admin" | "owner";

export class PermissionSystem {
  /** Dono do bot */
  static isOwner(msg: proto.IWebMessageInfo): boolean {
    const sender =
      msg.key?.participant || msg.key?.remoteJid || "";
    return OWNER.numbers.some(n => sender.includes(n));
  }

  /** É grupo */
  static isGroup(jid: string): boolean {
    return jid.endsWith("@g.us");
  }

  /** Admin do grupo (qualquer cargo conta) */
  static async isGroupAdmin(
    sock: WASocket,
    msg: proto.IWebMessageInfo
  ): Promise<boolean> {
    const jid = msg.key?.remoteJid;
    const user = msg.key?.participant;

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
      return false;
    }
  }

  /** Verificação central de permissão */
  static async checkPermission(
    sock: WASocket,
    msg: proto.IWebMessageInfo,
    required: PermissionLevel
  ): Promise<boolean> {
    const jid = msg.key?.remoteJid || "";

    // Owner sempre pode
    if (this.isOwner(msg)) return true;

    // Só owner pode owner
    if (required === "owner") return false;

    // Admin
    if (required === "admin") {
      if (this.isGroup(jid)) {
        return await this.isGroupAdmin(sock, msg);
      }
      return false;
    }

    // user
    return true;
  }
}