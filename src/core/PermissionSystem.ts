import { WASocket, proto } from "@whiskeysockets/baileys";
import { OWNER } from "../config/conf";

export enum PermissionLevel {
  USER = "user",
  ADMIN = "admin", // admin do grupo
  OWNER = "owner" // dono do bot
}

export interface PermissionContext {
  sock: WASocket;
  msg: proto.IWebMessageInfo;
  isOwner: boolean;
  isAdmin: boolean;
  isGroupAdmin: boolean;
  groupId?: string;
}

// Extensão do tipo 'GroupMetadata' para garantir que a propriedade 'admins' exista
interface GroupMetadata {
  admins: string[]; // A propriedade 'admins' é um array de strings (IDs dos administradores)
}

export class PermissionSystem {
  /**
   * Verifica se o usuário é dono do bot
   */
  static isOwner(msg: proto.IWebMessageInfo): boolean {
    const sender = msg.key?.remoteJid || "";
    return OWNER.numbers.some((num) => sender.includes(num));
  }

  /**
   * Verifica se a mensagem é de um grupo
   */
  static isGroup(jid: string): boolean {
    return jid.endsWith("@g.us");
  }

  /**
   * Obtém metadados do grupo
   */
  static async getGroupMetadata(sock: WASocket, jid: string) {
    try {
      return await sock.groupMetadata(jid);
    } catch {
      return null;
    }
  }

  /**
   * Verifica se é admin do grupo
   */
  static async isGroupAdmin(sock: WASocket, msg: proto.IWebMessageInfo): Promise<boolean> {
    const jid = msg.key?.remoteJid;
    const sender = msg.key?.participant;

    if (!jid || !sender) return false;
    if (!this.isGroup(jid)) return false;

    try {
      const metadata = await this.getGroupMetadata(sock, jid);
      return metadata?.admins?.includes(sender) ?? false;
    } catch {
      return false;
    }
  }

  /**
   * Verifica se o bot é admin do grupo
   */
  static async isBotAdmin(sock: WASocket, jid: string): Promise<boolean> {
    try {
      const botId = sock.user?.id;
      if (!botId) return false;

      const metadata = await this.getGroupMetadata(sock, jid);
      return metadata?.admins?.includes(botId) ?? false;
    } catch {
      return false;
    }
  }

  /**
   * Valida permissão de comando
   */
  static async checkPermission(
    sock: WASocket,
    msg: proto.IWebMessageInfo,
    requiredLevel: PermissionLevel
  ): Promise<boolean> {
    const jid = msg.key?.remoteJid || "";

    // Owner sempre tem permissão
    if (this.isOwner(msg)) return true;

    // Se requerer owner e não é owner
    if (requiredLevel === PermissionLevel.OWNER) return false;

    // Se requerer admin
    if (requiredLevel === PermissionLevel.ADMIN) {
      if (this.isGroup(jid)) {
        return await this.isGroupAdmin(sock, msg);
      }
      // Em DM, apenas owner pode usar admin commands
      return false;
    }

    // USER sempre tem acesso
    return true;
  }
}
