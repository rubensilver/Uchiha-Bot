// src/database/migrate.ts
import { getDB } from "./index.js";

getDB().exec(`
CREATE TABLE IF NOT EXISTS groups (
  jid TEXT PRIMARY KEY,
  is_open INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS users (
  jid TEXT PRIMARY KEY,
  vip INTEGER DEFAULT 0,
  premium INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS bot (
  key TEXT PRIMARY KEY,
  value TEXT
);
`);
