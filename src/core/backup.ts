// src/core/backup.ts
import fs from "fs";
import path from "path";

const DB_PATH = path.resolve("data/uchiha.db");
const BACKUP_DIR = path.resolve("backups");
const MAX_BACKUPS = 20;

if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

export function backupDatabase() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(BACKUP_DIR, `uchiha-${timestamp}.db`);

  fs.copyFileSync(DB_PATH, backupFile);

  const backups = fs
    .readdirSync(BACKUP_DIR)
    .filter(f => f.endsWith(".db"))
    .sort();

  while (backups.length > MAX_BACKUPS) {
    const old = backups.shift();
    if (old) fs.unlinkSync(path.join(BACKUP_DIR, old));
  }

  return backupFile;
}
