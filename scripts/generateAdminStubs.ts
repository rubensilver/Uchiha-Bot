/**
 * Gera stubs para cada comando admin dentro de src/commands/admin/
 * Executa com: npx ts-node scripts/generateAdminStubs.ts
 */

import * as fs from "fs";
import * as path from "path";

const COMMANDS = [
  "Add_ddd","Add_prefixo","Addlistabranca","Add 5511...","Antiaudio","Anticatalogo","Anticontato",
  "Antiddd","Antiddd-list","Antidoc","Antifake","Antilinkeasy","Antilinkgp","Antilinkhard","Antimagem",
  "Antiporno","Antienquete","Antiporno","Antistatus","Antisticker","Antivideo","Autorizar","Atividades",
  "Autorepo","Autosticker","Banghost","Ban","Bemvindo","Bemvindo2","Blockcmdgp","Changegroup","Descgp",
  "Desmute","Del_ddd","Descgp","Ephemeral","Fechargp","Fotogrupo","Grupo","Grupoinfo","Hidetag","Kick",
  "Legenda_imagem","Legenda_video","Legenda_estrangeiro","Legenda_Doc","Legendasaiu","Legendasaiu2",
  "Legenda_BV","Limitecaracteres","Limitecomandos","Lista_Ddd","Listaban","Listanegra","ListanegraG",
  "Listabranca","Marcar","Marcar2","Multiprefixo","Mute","Mutelist","Nomegp","Odelete","Promover",
  "Promover","Reviver","Revlinkgp","Rmphotogp","Regras","Regras","Reviver","Rmphotogp","Revlinkgp",
  "So_adm","Simih","Simih2","Status","Tirar_prefixo","Tirardalista","TirardalistaG","Totag","Tempocmd",
  "Tirar_prefixo","Unblockcmdgp","Welcome","x9","x9visuunica","Leveling","Limpar","Atividades"
];

// Normalize unique and alphabetical
const unique = Array.from(new Set(COMMANDS)).sort((a,b)=>a.localeCompare(b));

const outDir = path.join(__dirname, "../src/commands/admin");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const cmd of unique) {
  const safeName = cmd.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const file = path.join(outDir, `${safeName}.ts`);
  if (fs.existsSync(file)) continue; // don't overwrite
  const content = `import { AdminConfig } from "../../admin/AdminConfig";

/**
 * Stub command: ${cmd}
 * - permission: admin/group-owner (edit as needed)
 * - description: implemente a lógica real aqui
 */

export const meta = {
  name: "${cmd}",
  aliases: [],
  permission: "admin"
};

export async function run({ sock, msg, args }: { sock: any; msg: any; args: string[] }) {
  // Exemplo básico - verifique permissões no index antes de executar
  const reply = \`[Uchiha] comando ${cmd} executado (stub).\\nEdite src/commands/admin/${safeName}.ts para implementar.\`;
  try {
    await sock.sendMessage(msg.key.remoteJid, { text: reply });
  } catch (e) {
    console.error("Erro ao responder stub ${cmd}:", e);
  }
}
`;
  fs.writeFileSync(file, content, "utf8");
}

// cria index.ts com export dynamic
const indexFile = path.join(outDir, "_index.ts");
const files = fs.readdirSync(outDir).filter(f=>f.endsWith(".ts") && f !== "_index.ts");
const exportsLines = files.map(f=>{
  const name = f.replace(".ts","");
  return `export * as ${name} from "./${name}";`;
});
fs.writeFileSync(indexFile, exportsLines.join("\n")+"\n", "utf8");

console.log("Stubs gerados:", files.length);
console.log("Pasta:", outDir);
