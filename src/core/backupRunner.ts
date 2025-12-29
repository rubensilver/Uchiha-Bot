// src/core/backupRunner.ts
import { backupDatabase } from "./backup.js";
import { sendBackupToCloud } from "./backupExternal.js";

export async function runBackup() {
  const file = backupDatabase();
  await sendBackupToCloud(file);
}
