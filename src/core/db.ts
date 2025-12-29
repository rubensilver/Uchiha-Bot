import initSqlJs from "sql.js";
import fs from "fs";

const DB_PATH = "./data/uchiha.sqlite";

let db: any;

export async function initDB() {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `node_modules/sql.js/dist/${file}`
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

export function saveDB() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

export function getDB() {
  return db;
}