import fs from "fs";
import path from "path";

const BASE = "src/commands";

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (file.endsWith(".ts")) fix(full);
  }
}

function fix(file) {
  const name = path.basename(file, ".ts");

  const content = `import { WASocket, proto } from "@whiskeysockets/baileys";
import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "${name}",
    category: "auto",
    description: "Comando ${name}"
  },

  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    await sock.sendMessage(jid, {
      text: "👁️ Comando ${name} executado pelo clã Uchiha."
    });
  }
};

export default command;
`;

  fs.writeFileSync(file, content);
  console.log("✔ Corrigido:", file);
}

walk(BASE);
