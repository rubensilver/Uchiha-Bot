import { Command, CommandContext } from "../types/Command.js";
import { registerCommand, clearCommands } from "./commandHandler.js";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

export {}; // impede conflito de escopo

const __filename = fileURLToPath(import.meta.url);
const commandsDir = path.dirname(__filename);

// Carrega dinamicamente os comandos
export async function loadCommands() {
  // 🔥 LIMPA COMANDOS ANTIGOS
  clearCommands();

  const dirs = fs
    .readdirSync(commandsDir)
    .filter(dir =>
      fs.statSync(path.join(commandsDir, dir)).isDirectory()
    );

  for (const dir of dirs) {
    const dirPath = path.join(commandsDir, dir);

    const files = fs
      .readdirSync(dirPath)
      .filter(file => file.endsWith(".ts") || file.endsWith(".js"))

    for (const file of files) {
      const commandPath = path.join(dirPath, file);
      const mod = await import(commandPath);
      const command = mod.default;

      if (!command?.meta?.name || typeof command.run !== "function") continue;

      registerCommand(command as Command);
    }
  }
}

const command: Command = {
  meta: {
    name: "loader",
    alias: ["reload", "recarregar"],
    category: "owner",
    description: "Recarrega todos os comandos do Clã Uchiha",
  },

  async run(ctx: CommandContext) {
    const jid = ctx.msg.key?.remoteJid;
    if (!jid) return;

    await loadCommands();

    await ctx.sock.sendMessage(jid, {
      text: `🩸 *Ritual de Reconexão Uchiha*

Os selos foram refeitos.
Os comandos despertaram novamente.

🔥 *“Mesmo após a queda, o Sharingan volta a girar.”*`,
    });
  },
};

export default command;