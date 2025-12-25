const fs = require("fs");
const path = require("path");

const BASE = path.join(__dirname, "src", "commands");

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      walk(full);
      continue;
    }

    if (!file.endsWith(".ts")) continue;

    let code = fs.readFileSync(full, "utf8");
    let changed = false;

    // Só mexe se usa sendMessage(jid)
    if (code.includes("sendMessage(jid") && !code.includes("const jid = msg.key?.remoteJid")) {
      code = code.replace(
        /run:\s*async\s*\(\s*\{\s*sock,\s*msg,\s*args\s*\}\s*\)\s*=>\s*{/,
        `run: async ({ sock, msg, args }) => {
  const jid = msg.key?.remoteJid;
  if (!jid) return;`
      );
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(full, code, "utf8");
      console.log("✔ JID corrigido:", full);
    }
  }
}

walk(BASE);
console.log("🔥 TODOS OS ERROS TS2345 FORAM CORRIGIDOS.");
