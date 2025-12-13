// scripts/validateAdminCommands.js
// Execute: node scripts/validateAdminCommands.js
const fs = require("fs");
const path = require("path");

const commandsDir = path.join(__dirname, "../src/commands/admin"); // ajusta se for outro caminho
const filesToCheck = [
  "Abrirgp.ts",
  "Add_ddd.ts",
  "Add_prefixo.ts",
  "Add.ts",
  "Addlistabranca.ts"
];

function read(file) {
  try {
    return fs.readFileSync(path.join(commandsDir, file), "utf8");
  } catch (e) {
    return null;
  }
}

function hasMeta(content) {
  if (!content) return false;
  return /export\s+const\s+meta\s*=/.test(content) ||
         /export\s+default\s+meta/.test(content) ||
         /export\s+const\s+meta\b/.test(content);
}

function hasRun(content) {
  if (!content) return false;
  return /export\s+async\s+function\s+run\s*\(/.test(content) ||
         /export\s+const\s+run\s*=\s*async\s*\(/.test(content) ||
         /export\s+function\s+run\s*\(/.test(content);
}

function checkFile(file) {
  const content = read(file);
  if (content === null) return { file, exists: false };
  const meta = hasMeta(content);
  const run = hasRun(content);
  // optional: check for default export
  const hasDefaultExport = /export\s+default\s+/.test(content);
  return { file, exists: true, meta, run, hasDefaultExport };
}

console.log("Validando ficheiros em:", commandsDir);
console.log("Files to check:", filesToCheck.join(", "));
console.log("--------------------------------------------------");

const results = filesToCheck.map(checkFile);

let problems = 0;
for (const r of results) {
  console.log(`Ficheiro: ${r.file}`);
  if (!r.exists) {
    console.log("  ✖ Não encontrado. Verifica o caminho / nome do ficheiro.");
    problems++;
    continue;
  }
  console.log("  ✔ Encontrado.");
  console.log(`  - meta export: ${r.meta ? "OK" : "MISSING"}`);
  console.log(`  - run export: ${r.run ? "OK" : "MISSING"}`);
  console.log(`  - default export detectada: ${r.hasDefaultExport ? "yes" : "no"}`);
  if (!r.meta || !r.run) problems++;
  console.log("--------------------------------------------------");
}

if (problems === 0) {
  console.log("✅ Tudo parece ter os *stubs* mínimos (meta + run).");
} else {
  console.log(`⚠ Foram encontrados ${problems} problema(s).`);
  console.log("Sugestões:");
  console.log("- Se faltar 'meta', adiciona no topo do ficheiro:");
  console.log("  export const meta = { name: \"nomeDoCmd\", permission: \"admin\" };");
  console.log("- Se faltar 'run', adiciona algo tipo:");
  console.log("  export async function run({ sock, msg, args }) {");
  console.log("    await sock.sendMessage(msg.key.remoteJid, { text: '[stub] comando executado' });");
  console.log("  }");
  console.log("- Confirma também que o nome do ficheiro corresponde ao export no teu _index.ts (case-sensitive em alguns sistemas).");
  console.log("- Se usas TypeScript e ESModules (ts-node), podes executar 'npx tsc --noEmit' para compilar e ver erros de tipos.");
}
