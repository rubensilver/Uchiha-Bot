// src/database/repositories/UserRepo.ts
import { getDB } from "../index.js";

export const UserRepo = {
  ensure(jid: string) {
    getDB().prepare(
      "INSERT OR IGNORE INTO users (jid) VALUES (?)"
    ).run([jid]);
  },

  setVip(jid: string, value: boolean) {
    this.ensure(jid);
    getDB().prepare(
      "UPDATE users SET vip = ? WHERE jid = ?"
    ).run([value ? 1 : 0, jid]);
  },

  setPremium(jid: string, value: boolean) {
    this.ensure(jid);
    getDB().prepare(
      "UPDATE users SET premium = ? WHERE jid = ?"
    ).run([value ? 1 : 0, jid]);
  },

  get(jid: string) {
    return getDB()
      .prepare("SELECT * FROM users WHERE jid = ?")
      .get([jid]);
  }
};
