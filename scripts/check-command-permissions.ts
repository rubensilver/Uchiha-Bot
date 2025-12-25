import fs from "fs";
import path from "path";

const COMMANDS_DIR = path.resolve("src/commands");

function scan(dir: string) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      scan(full);
      continue;
    }

    if (!file.endsWith(".ts")) continue;

    const content = fs.readFileSync(full, "utf8");

    const forbidden =
      content.includes("groupMetadata") ||
      content.includes("senderIsAdmin") ||
      content.includes("botIsAdmin") ||
      content.includes("checkAdmin(");

    if (forbidden) {
      console.log("⚠️ Permissão dentro do comando:", full);
    }
  }
}

console.log("🔍 Verificando comandos...");
scan(COMMANDS_DIR);
console.log("✔️ Verificação finalizada.");
