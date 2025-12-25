import fs from "fs";
import path from "path";

const COMMANDS_DIR = path.join(__dirname, "../src/commands");

function cleanFile(filePath: string) {
  let content = fs.readFileSync(filePath, "utf8");

  content = content
    // remove checkAdmin import
    .replace(/import\s+\{[^}]*checkAdmin[^}]*\}.*\n/g, "")

    // remove groupMetadata
    .replace(/const\s+metadata\s*=\s*await\s+sock\.groupMetadata\([\s\S]*?\);\n/g, "")

    // remove admin checks
    .replace(/if\s*\([\s\S]*?admin[\s\S]*?\)\s*\{[\s\S]*?\}/g, "")

    // remove admin messages
    .replace(/sock\.sendMessage\([\s\S]*?(admin|administrador|líder)[\s\S]*?\);/gi, "");

  fs.writeFileSync(filePath, content);
}

function walk(dir: string) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (file.endsWith(".ts")) cleanFile(full);
  }
}

walk(COMMANDS_DIR);
console.log("✅ Permissões removidas dos comandos.");
