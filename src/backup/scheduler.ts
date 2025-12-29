import cron from "node-cron";
import { backupSQLite } from "./sqliteBackup.js";

export function startBackupScheduler() {
  cron.schedule("0 */6 * * *", async () => {
    await backupSQLite();
  });
}
