// src/index.ts
import { startBot } from "./start.js";
import { startBackupScheduler } from "./backup/scheduler.js";
import { loadCommands } from "./commands/loader.js";

/**
 * Ponto de entrada da aplicação
 * - Carrega comandos
 * - Inicia o bot
 * - Inicia backups
 */
async function bootstrap() {
  await loadCommands();        // 🔥 REGISTRA TODOS OS COMANDOS
  await startBot();            // 🔥 CONECTA AO WHATSAPP
  startBackupScheduler();      // 🔥 BACKUPS
}

bootstrap();