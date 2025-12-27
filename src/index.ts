// src/index.ts
import fs from "fs";
import path from "path";
import { startBot } from "./start";
import { Command } from "./types/Command";
import { registerCommand } from "./core/commandHandler";

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

      const mod = require(full);
      const cmd: Command | undefined = mod.default ?? mod;
      if (!cmd || !cmd.meta || !cmd.run) continue;

      const rel = path.relative(baseDir, full);
      const parts = rel.split(path.sep);
      if (!cmd.meta.category && parts[0]) {
        cmd.meta.category = parts[0].toLowerCase();
      }

      registerCommand(cmd);
    }
  }

  walk(baseDir);
}

startBot();