// src/core/db.ts
import initSqlJs, { type Database as SqlDatabase } from "sql.js";
import fs from "fs";
import path from "path";

let db: SqlDatabase | null = null;

export const DB_PATH = path.resolve("data/uchiha.sqlite");
const SCHEMA_PATH = path.resolve("src/database/schema.sql");

// inicializa o banco (UMA vez)
export async function initDB(): Promise<void> {
  if (db) return;

  fs.mkdirSync("data", { recursive: true });

  const SQL = await initSqlJs({
    locateFile: (file: string) =>
      path.resolve("node_modules/sql.js/dist", file),
  });

  // abre ou cria banco
  if (fs.existsSync(DB_PATH)) {
    const filebuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(filebuffer);
  } else {
    db = new SQL.Database();
  }

  // 🔥 EXECUTA O SCHEMA
  const schema = fs.readFileSync(SCHEMA_PATH, "utf8");
  db.exec(schema);

  saveDB();
}

// salva explicitamente
export function saveDB(): void {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// acesso único ao DB
export function getDB(): SqlDatabase {
  if (!db) throw new Error("DB not initialized");
  return db;
}