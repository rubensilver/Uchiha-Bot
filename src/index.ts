// src/index.ts
import fs from "fs";
import path from "path";
import { startBot } from "./start";
import { startBackupScheduler } from "./backup/scheduler";
import { Command } from "./types/Command";
import { registerCommand } from "./commands/commandHandler";

/**
 * Carrega todos os comandos da pasta /commands
 * Define automaticamente a categoria pelo nome da pasta
 * Registra tudo no CORE (commandHandler)
 */
export function loadCommands() {
  const commandsDir = path.join(__dirname, "commands");

  function walk(dir: string) {
    for (const file of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, file);

      // Entrar em subpastas
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
        continue;
      }

      // Apenas arquivos JS/TS
      if (!file.endsWith(".js") && !file.endsWith(".ts")) continue;

      const mod = require(fullPath);
      const cmd: Command | undefined = mod.default ?? mod;

      if (!cmd || !cmd.meta || typeof cmd.run !== "function") {
        console.warn(`⚠️ Arquivo ignorado: ${file}`);
        continue;
      }

      // Categoria automática pela pasta
      const relative = path.relative(commandsDir, fullPath);
      const [category] = relative.split(path.sep);

      if (!cmd.meta.category && category) {
        cmd.meta.category = category.toLowerCase();
      }

      registerCommand(cmd);
    }
  }

  walk(commandsDir);
}

// Inicializa o bot
startBot();
// Backup do Bot
startBackupScheduler();