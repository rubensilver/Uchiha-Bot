// src/database/index.ts
import type { Database as SqlDatabase } from "sql.js";
import { initDB, getDB } from "../core/db.js";
import path from "path";
import fs from "fs";

// garante a pasta do banco
fs.mkdirSync("data", { recursive: true });

export { initDB, getDB };

// mantém o path (metadata / referência)
export const dbPath = path.resolve("data/uchiha.db");

// inicialização explícita (chamar UMA vez no bootstrap)
export async function startDatabase(): Promise<void> {
  await initDB();
}

// acesso único ao banco (fonte da verdade)
export function db(): SqlDatabase {
  return getDB();
}