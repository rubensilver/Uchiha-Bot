const fs = require("fs");
const path = require("path");

const root = "src/commands";

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (file.endsWith(".ts")) {
      let c = fs.readFileSync(full, "utf8");

      c = c.replace(
        /import\s+\{\s*Command\s*\}.*;/g,
        'import { Command } from "../../types/Command";'
      );

      c = c.replace(
        /async\s*\(\s*\{\s*sock,\s*m,\s*args\s*\}\s*\)/g,
        'async ({ sock, msg, args })'
      );

      fs.writeFileSync(full, c);
      console.log("✔", full);
    }
  }
}

walk(root);
console.log("🔥 TODOS os comandos corrigidos");
