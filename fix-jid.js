const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "src", "commands");

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    if (!file.endsWith(".ts")) continue;

    let content = fs.readFileSync(full, "utf8");

    // só mexe se tiver sendMessage(jid,
    if (!content.includes("sendMessage(jid")) continue;

    // evita duplicar o guard
    if (content.includes("if (!jid) return;")) continue;

    // tenta achar a definição do jid
    const jidRegex = /const\s+jid\s*=\s*msg\.key\??\.remoteJid\s*;?/;

    if (!jidRegex.test(content)) continue;

    content = content.replace(
      jidRegex,
      match => `${match}\n  if (!jid) return;`
    );

    fs.writeFileSync(full, content, "utf8");
    console.log("✔ corrigido:", full);
  }
}

walk(ROOT);

console.log("\n✅ Correção finalizada.");
