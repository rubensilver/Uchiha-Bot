// src/core/backupRunner.ts
import { backupDatabase } from "./backup";
import { sendBackupToCloud } from "./backupExternal";

export async function runBackup() {
  const file = backupDatabase();
  await sendBackupToCloud(file);
}
