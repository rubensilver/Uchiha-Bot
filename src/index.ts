// src/index.ts  (loader -> handler ligação automática de categorias)
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

      // Carrega o módulo do comando
      const mod = require(full);
      const cmd: Command | undefined = mod.default ?? mod;

      if (!cmd || !cmd.meta || !cmd.run) continue;

      // Determina a categoria com base na pasta relativa (automaticamente)
      // Ex.: src/commands/admin/xxx.ts -> category = 'admin'
      const rel = path.relative(baseDir, full);
      const parts = rel.split(path.sep);
      const inferredCategory = parts.length > 1 ? parts[0].toLowerCase() : "";

      // Só setamos a categoria em tempo de execução — não alteramos ficheiro do comando
      if (!cmd.meta.category && inferredCategory) {
        // forçamos a categoria no objeto em memória para que o handler a use
        cmd.meta.category = inferredCategory;
      }

      // Registrar comando (handler aplica permissões com base em cmd.meta.category)
      registerCommand(cmd); // ✅ ligação REAL
    }
  }

  walk(baseDir);
}

// 🔥 ordem correta
loadCommands();
startBot();
