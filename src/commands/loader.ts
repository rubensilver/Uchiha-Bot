import { Command, CommandContext } from "../types/Command";
import * as path from "path";
import * as fs from "fs";

// Essa função irá carregar dinamicamente os comandos da pasta de comandos
export async function loadCommands() {
  const commandsDir = "/data/data/com.termux/files/home/Uchiha-Bot/src/commands";
  const dirs = fs.readdirSync(commandsDir).filter(file => fs.statSync(path.join(commandsDir, file)).isDirectory()); // Buscar subpastas
console.log('Diretório de comandos:', commandsDir);

for (const dir of dirs) {
  const dirPath = path.join(commandsDir, dir);
  const files = fs.readdirSync(dirPath).filter(file => file.endsWith(".ts"));

  for (const file of files) {
    const commandPath = path.join(dirPath, file);  // Modificado!
    const commandModule = require(commandPath).default;
    if (commandModule) {
      // Aqui você registraria o comando, por exemplo, no bot handler
      // Supondo que o bot tenha um método de registro como `registerCommand` (isso vai depender do seu código)
      // bot.registerCommand(commandModule);
    }
  }
}

}

const command: Command = {
  meta: {
    name: "loader",
    alias: ["reload", "recarregar"],
    category: "fix",
    description: "Recarrega todos os comandos do Clã Uchiha",
  },

  async run(ctx: CommandContext) {
    const { sock, msg } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    // Recarrega os comandos
    await loadCommands(); // 🔥 religa comandos no handler

    await sock.sendMessage(jid, {
      text: `🩸 *Ritual de Reconexão Uchiha*

Os selos foram refeitos.
Os comandos despertaram novamente.

🔥 *“Mesmo após a queda, o Sharingan volta a girar.”*`
    });
  }
};

export default command;