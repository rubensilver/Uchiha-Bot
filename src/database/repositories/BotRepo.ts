// src/database/repositories/BotRepo.ts
import { getDB } from "../index";

export const BotRepo = {
  set(key: string, value: string) {
    getDB().prepare(`
      INSERT INTO bot (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value=excluded.value
    `).run(key, value);
  },

  get(key: string): string | null {
    const row = getDB()
      .prepare("SELECT value FROM bot WHERE key = ?")
      .get(key) as any;
    return row?.value ?? null;
  }
};
