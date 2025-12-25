const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src", "commands");

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

    // 1️⃣ Corrigir import errado
    if (code.includes("core/types")) {
      code = code.replace(/from\s+['"].*core\/types['"]/g, "from \"../../types/Command\"");
      changed = true;
    }

    // 2️⃣ Forçar Command tipado
    if (!code.includes("const command: Command")) {
      code = code.replace(
        /export\s+default\s+{/,
        "const command: Command = {"
      );
      code += "\n\nexport default command;\n";
      changed = true;
    }

    // 3️⃣ Garantir jid seguro
    if (code.includes("sendMessage(") && !code.includes("const jid")) {
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
      console.log("✔ Corrigido:", full);
    }
  }
}

walk(SRC);
console.log("🔥 TODOS OS COMANDOS FORAM NORMALIZADOS.");
