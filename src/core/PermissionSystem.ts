// src/core/PermissionSystem.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { OWNER } from "../config/conf.js";
import { getGroupAdminsCached } from "./AdminCache.js";

export type PermissionLevel = "user" | "admin" | "owner";

export class PermissionSystem {

  static isBot(msg: proto.IWebMessageInfo): boolean {
    return msg.key?.fromMe === true;
  }

  static isOwner(msg: proto.IWebMessageInfo): boolean {
    const jid =
      msg.key?.participant ??
      msg.key?.remoteJid ??
      "";

    const number = jid.split("@")[0];
    return OWNER.numbers.includes(number);
  }

  static async checkPermission(
    sock: WASocket,
    msg: proto.IWebMessageInfo,
    required: PermissionLevel
  ): Promise<{ allowed: boolean; botIsAdmin?: boolean }> {

    if (this.isBot(msg)) return { allowed: true };
    if (this.isOwner(msg)) return { allowed: true };

    if (required === "user") return { allowed: true };
    if (required === "owner") return { allowed: false };

    if (required === "admin") {
      const groupJid = msg.key?.remoteJid;
      const sender = msg.key?.participant;

      if (!groupJid || !sender || !groupJid.endsWith("@g.us")) {
        return { allowed: false };
      }

      const cache = await getGroupAdminsCached(sock, groupJid);

      const senderIsAdmin = cache.admins.includes(sender);

      if (!senderIsAdmin) {
        return { allowed: false };
      }

      return {
        allowed: true,
        botIsAdmin: cache.botIsAdmin
      };
    }

    return { allowed: true };
  }
}