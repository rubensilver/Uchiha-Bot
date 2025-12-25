import fs from "fs";
import path from "path";

const BASE_DIR = path.resolve("src/commands");

function processFile(filePath: string) {
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("msg.key.participant")) return;
  if (content.includes("if (!msg.key) return;")) return;

  content = content.replace(
    /(const\s+jid\s*=\s*msg\.key\.remoteJid[^\n]*\n)/,
    `$1\n  if (!msg.key) return;\n`
  );

  fs.writeFileSync(filePath, content);
  console.log("✔ Corrigido:", filePath);
}

function walk(dir: string) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (file.endsWith(".ts")) processFile(full);
  }
}

walk(BASE_DIR);
