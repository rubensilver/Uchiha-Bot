import { getDB, saveDB } from "../core/db.js";

export function seedBot() {
  const db = getDB();

  db.prepare(
    "INSERT OR IGNORE INTO bot (key, value) VALUES (?, ?)"
  ).run(["number", "BOT"]);

  saveDB();
}
