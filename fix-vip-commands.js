const fs = require("fs");
const path = require("path");

const VIP_DIR = path.join(__dirname, "src/commands/vip");

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // troca QUALQUER forma de run antiga pelo padrão final
  content = content.replace(
    /export const run[\s\S]*?=\s*async\s*\([^)]*\)\s*=>\s*\{/g,
    'export const run: Command["run"] = async (sock, m, args) => {'
  );

  fs.writeFileSync(filePath, content);
  console.log("✔ Corrigido:", filePath);
}

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith(".ts")) {
      fixFile(fullPath);
    }
  }
}

walk(VIP_DIR);

console.log("\n🔥 TODOS os comandos VIP foram corrigidos.");
