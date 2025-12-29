// src/database/index.ts
import type { Database as SqlDatabase } from "sql.js";
import { initDB, getDB as _getDB } from "../core/db";
import path from "path";
import fs from "fs";

let database: SqlDatabase | null = null;

export async function startDatabase() {
  await initDB();
  database = getDB();
}

export const getDB = _getDB;

// mantém o path (não removido)
const dbPath = path.resolve("data/uchiha.db");
fs.mkdirSync("data", { recursive: true });

// mantém export db (corrigido)
export function db(): SqlDatabase {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
}

// inicializa automaticamente (mantido)
startDatabase();