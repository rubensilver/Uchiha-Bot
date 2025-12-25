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

  // Já está tipado? pula
  if (code.includes('Command["run"]')) continue;

  // Garante import do Command
  if (!code.includes("Command")) {
    const relative = path.relative(path.dirname(file), path.join(__dirname, "src", "types", "command"));
    const importPath = relative.startsWith(".") ? relative : "./" + relative;

    code =
      `import { Command } from "${importPath.replace(/\\/g, "/")}";\n` +
      code;
  }

  // Tipar função run
  code = code.replace(
    /export const run\s*=\s*async\s*\(/,
    'export const run: Command["run"] = async ('
  );

  // Corrigir remoteJid nullable
  code = code.replace(/m\.key\.remoteJid/g, "m.key.remoteJid!");

  fs.writeFileSync(file, code);
  console.log("✔ Corrigido:", file);
}

console.log("\n🔥 TODOS OS COMANDOS FORAM TIPADOS COM SUCESSO");
