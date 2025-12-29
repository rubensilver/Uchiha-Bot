// src/core/db.ts
import initSqlJs, { type Database as SqlDatabase } from "sql.js";
import fs from "fs";
import path from "path";

export const DB_PATH = path.resolve("data/uchiha.sqlite");

let db: SqlDatabase | null = null;

// inicializa o banco (UMA vez)
export async function initDB(): Promise<void> {
  fs.mkdirSync("data", { recursive: true });

  const SQL = await initSqlJs({
    locateFile: (file: string) =>
      path.resolve("node_modules/sql.js/dist", file),
  });

  if (fs.existsSync(DB_PATH)) {
    const filebuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(filebuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS groups (
      jid TEXT PRIMARY KEY,
      is_open INTEGER DEFAULT 1
    );
  `);
}

// salva explicitamente (quando TU chamar)
export function saveDB(): void {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// única fonte do DB
export function getDB(): SqlDatabase {
  if (!db) {
    throw new Error("DB not initialized");
  }
  return db;
}