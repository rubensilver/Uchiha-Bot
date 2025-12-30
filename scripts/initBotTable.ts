import { initDB, getDB, saveDB } from "../src/core/db.ts";

await initDB(); // 🔴 OBRIGATÓRIO

const db = getDB();

db.exec(`
  CREATE TABLE IF NOT EXISTS bot (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

saveDB();

console.log("✅ Tabela bot criada/verificada");
process.exit(0);
