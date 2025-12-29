// src/core/PrefixManager.ts
import { PREFIX } from "../config/settings.js";

export class PrefixManager {
  // ===============================
  // PREFIXOS SIMPLES (JÁ EXISTENTES)
  // ===============================
  private static groupPrefixes = new Map<string, string>();
  private static userPrefixes = new Map<string, string>();

  // ===============================
  // MULTI PREFIXO (NOVO)
  // ===============================
  private static prefixes: string[] = [PREFIX];
  private static multiEnabled = false;

  // ===============================
  // MÉTODOS JÁ EXISTENTES (NÃO ALTERADOS)
  // ===============================
  static getDefault(): string {
    return PREFIX;
  }

  static getPrefix(jid?: string, userId?: string): string {
    if (this.multiEnabled && this.prefixes.length > 0) {
      return this.prefixes[0];
    }

    if (userId && this.userPrefixes.has(userId)) {
      return this.userPrefixes.get(userId)!;
    }

    if (jid && this.groupPrefixes.has(jid)) {
      return this.groupPrefixes.get(jid)!;
    }

    return this.getDefault();
  }

  static setGroupPrefix(jid: string, prefix: string) {
    this.groupPrefixes.set(jid, prefix);
  }

  static setUserPrefix(userId: string, prefix: string) {
    this.userPrefixes.set(userId, prefix);
  }

  static resetGroupPrefix(jid: string) {
    this.groupPrefixes.delete(jid);
  }

  static resetUserPrefix(userId: string) {
    this.userPrefixes.delete(userId);
  }

  // ===============================
  // 🔥 MÉTODOS NOVOS (PARA OS COMANDOS)
  // ===============================

  // MULTI PREFIXO
  static isMultiEnabled(): boolean {
    return this.multiEnabled;
  }

  static setMulti(value: boolean) {
    this.multiEnabled = value;
  }

  // GERENCIAMENTO DE PREFIXOS
  static getPrefixes(): string[] {
    return [...this.prefixes];
  }

  static getAll(): string[] {
    return this.getPrefixes();
  }

  static addPrefix(prefix: string) {
    if (!this.prefixes.includes(prefix)) {
      this.prefixes.push(prefix);
    }
  }

  static remove(prefix: string) {
    this.prefixes = this.prefixes.filter(p => p !== prefix);

    // nunca deixar sem prefixo
    if (this.prefixes.length === 0) {
      this.prefixes.push(this.getDefault());
    }
  }

  static setPrefix(prefix: string) {
    this.prefixes = [prefix];
  }
}