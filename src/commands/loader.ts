// src/commands/loader.ts
import * as fs from "fs";
import * as path from "path";

export interface Command {
  meta: {
    name: string;
    aliases?: string[];
    permission?: string;
    category?: string;
    description?: string;
  };
  run: (opts: { sock: any; msg: any; args: string[] }) => Promise<any>;
}

function findExported(obj: any, keys: string[]) {
  for (const k of keys) {
    if (!obj) continue;
    if (Object.prototype.hasOwnProperty.call(obj, k)) return obj[k];
  }
  return undefined;
}

/**
 * Normaliza qualquer módulo de comando num Command válido:
 * - aceita `export default { meta, run }` (ESM default)
 * - aceita `exports.meta = {...}; exports.run = (...) => {}` (named)
 * - aceita variações de nomes: alias / aliases
 * - transforma run(sock,msg,args) em run({sock,msg,args})
 */
function normalizeModule(mod: any): Command | null {
  const raw = mod.default ?? mod;

  const meta =
    findExported(raw, ["meta", "META", "Meta"]) ||
    findExported(mod, ["meta", "META", "Meta"]);

  const runFn =
    findExported(raw, ["run", "Run"]) ||
    findExported(mod, ["run", "Run"]);

  if (!meta || !runFn || typeof runFn !== "function") return null;

  // Normalize aliases naming (alias / aliases)
  if (!meta.aliases && meta.alias) {
    meta.aliases = Array.isArray(meta.alias) ? meta.alias : [meta.alias];
  }

  const wrappedRun = async ({ sock, msg, args }: { sock: any; msg: any; args: string[] }) => {
    try {
      // If original function expects 1 argument (object style) -> call with object
      if (runFn.length === 1) {
        return await runFn({ sock, msg, args });
      }
      // If it expects 3 or more -> call as (sock, msg, args)
      return await runFn(sock, msg, args);
    } catch (err) {
      // rethrow to handler
      throw err;
    }
  };

  return {
    meta,
    run: wrappedRun
  };
}

export function loadCommands(dir: string): Map<string, Command> {
  const commands = new Map<string, Command>();

  if (!fs.existsSync(dir)) {
    console.warn("Diretório de comandos não existe:", dir);
    return commands;
  }

  const files = fs.readdirSync(dir).filter(f =>
    (f.endsWith(".ts") || f.endsWith(".js")) &&
    !f.startsWith("_") &&
    f !== "index.ts"
  );

  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      // require pode cache; usamos require para compatibilidade com ts-node
      const mod = require(filePath);
      const cmd = normalizeModule(mod);

      if (!cmd) {
        console.warn(`Ignorado (sem meta/run): ${file}`);
        continue;
      }

      const name = String(cmd.meta.name || path.basename(file, path.extname(file))).toLowerCase();
      commands.set(name, cmd);

      // aliases
      const aliases = cmd.meta.aliases ?? [];
      if (Array.isArray(aliases)) {
        for (const a of aliases) {
          if (!a) continue;
          commands.set(String(a).toLowerCase(), cmd);
        }
      }
    } catch (e) {
      console.error("Erro ao carregar comando:", file, e);
    }
  }

  return commands;
}