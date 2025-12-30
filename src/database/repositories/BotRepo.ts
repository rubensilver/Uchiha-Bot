// src/database/repositories/BotRepo.ts
import { getDB, saveDB } from "../../core/db.js";

/**
 * Repositório do BOT
 * Tabela: bot (key TEXT, value TEXT)
 */
export const BotRepo = {
  setAdminGroup(jid: string): void {
    const db = getDB();

    db.prepare(
      "INSERT OR REPLACE INTO bot (key, value) VALUES (?, ?)"
    ).run(["admin_group", jid]);

    saveDB();
  },

  getAdminGroup(): string | null {
    const row = getDB()
      .prepare("SELECT value FROM bot WHERE key = ?")
        .get(["admin_group"]) as unknown as { value: string } | undefined;

    return row?.value ?? null;
  },
};