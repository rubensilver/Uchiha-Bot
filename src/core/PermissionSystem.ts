// src/core/PermissionSystem.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { OWNER } from "../config/conf";

export type RequiredLevel = "owner" | "admin" | "user";

export class PermissionSystem {
  static isOwner(msg: proto.IWebMessageInfo): boolean {
    const sender = msg.key?.participant || msg.key?.remoteJid || "";
    return OWNER.numbers.some((num) => (sender || "").includes(num));
  }

  static isGroup(jid: string): boolean {
    return jid.endsWith("@g.us");
  }

  static async getGroupMetadata(sock: WASocket, jid: string) {
    try {
      return await sock.groupMetadata(jid);
    } catch {
      return null;
    }
  }

  static async isGroupAdmin(sock: WASocket, msg: proto.IWebMessageInfo): Promise<boolean> {
    const jid = msg.key?.remoteJid;
    const sender = msg.key?.participant;
    if (!jid || !sender) return false;
    if (!this.isGroup(jid)) return false;
    try {
      const meta = await this.getGroupMetadata(sock, jid);
      return meta?.admins?.includes(sender) ?? false;
    } catch {
      return false;
    }
  }

  static async isBotAdmin(sock: WASocket, jid: string): Promise<boolean> {
    try {
      const botId = sock.user?.id;
      if (!botId) return false;
      const meta = await this.getGroupMetadata(sock, jid);
      return meta?.admins?.includes(botId) ?? false;
    } catch {
      return false;
    }
  }

  // required: 'owner' | 'admin' | 'user'
  static async checkPermission(sock: WASocket, msg: proto.IWebMessageInfo, required: RequiredLevel): Promise<boolean> {
    // Owner always allowed
    if (this.isOwner(msg)) return true;

    if (required === "user") return true;

    const jid = msg.key?.remoteJid || "";
    if (required === "owner") return false; // not owner -> denied

    // required === 'admin'
    // If group: check if sender is group admin
    if (this.isGroup(jid)) {
      return await this.isGroupAdmin(sock, msg);
    }

    // In private chats, only owner (already checked) can run admin commands
    return false;
  }
}
