// src/index.ts  (CORREÇÃO – ligação real entre loader → handler)

import fs from "fs";
import path from "path";
import { startBot } from "./start";
import { Command } from "./types/Command";
import { registerCommand } from "./commands/commandHandler";

// 🔥 carrega TODOS os comandos e registra no handler
export function loadCommands() {
  const baseDir = path.join(__dirname, "commands");

  function walk(dir: string) {
    for (const file of fs.readdirSync(dir)) {
      const full = path.join(dir, file);

      if (fs.statSync(full).isDirectory()) {
        walk(full);
        continue;
      }

      if (!file.endsWith(".js") && !file.endsWith(".ts")) continue;
      if (file.includes("commandHandler")) continue;

      const mod = require(full);
      const cmd: Command | undefined = mod.default ?? mod;

      if (!cmd?.meta || !cmd?.run) continue;

      registerCommand(cmd); // ✅ ligação REAL
    }
  }

  walk(baseDir);
}

// 🔥 ordem correta
loadCommands();
startBot();