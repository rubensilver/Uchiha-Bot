const fs = require("fs");
const path = require("path");

const COMMANDS_DIR = path.join(__dirname, "src", "commands");

function walk(dir) {
  return fs.readdirSync(dir).flatMap(file => {
    const full = path.join(dir, file);
    return fs.statSync(full).isDirectory() ? walk(full) : full;
  });
}

const files = walk(COMMANDS_DIR).filter(f => f.endsWith(".ts"));

for (const file of files) {
  let code = fs.readFileSync(file, "utf8");

  // Força assinatura correta
  code = code.replace(
    /export const run\s*:\s*Command\["run"\]\s*=\s*async\s*\(\s*\{[^}]*\}\s*\)/g,
    'export const run: Command["run"] = async (sock, m, args)'
  );

  // Se ainda tiver run sem tipagem
  code = code.replace(
    /export const run\s*=\s*async\s*\(/g,
    'export const run: Command["run"] = async (sock, m, args) => ('
  );

  // Corrigir remoteJid
  code = code.replace(/m\.key\.remoteJid/g, "m.key.remoteJid!");

  fs.writeFileSync(file, code);
  console.log("✔ Corrigido:", file);
}

console.log("\n🔥 TODOS OS COMANDOS PADRONIZADOS");
