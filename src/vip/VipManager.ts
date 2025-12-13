// src/vip/VipManager.ts
import * as fs from "fs";
import * as path from "path";

export interface VipEntry {
  id: string;       // ex: "244923456789@s.whatsapp.net"
  note?: string;
  addedAt: string;  // ISO
}

const DB_PATH = path.join(__dirname, "../database/vips.json");

// ───────────────────────────────────────────
//  NOVA FUNÇÃO: Normaliza números automaticamente
// ───────────────────────────────────────────
function normalizeNumber(input: string): string {
  if (!input) return "";

  let number = String(input).trim();

  // remove @, +, espaços, traços, parênteses, etc.
  number = number
    .replace(/[^0-9]/g, "") // deixa só dígitos
    .trim();

  // se ficou vazio → inválido
  if (!number) return "";

  // adiciona sufixo padrão Baileys
  return `${number}@s.whatsapp.net`;
}

// ───────────────────────────────────────────
function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

function readAll(): VipEntry[] {
  try {
    ensureDb();
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (e) {
    console.error("VipManager read error:", e);
    return [];
  }
}

function writeAll(items: VipEntry[]) {
  ensureDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(items, null, 2), "utf-8");
}

// ───────────────────────────────────────────
// VIP MANAGER FINAL COM AUTO-CORREÇÃO DE NÚMEROS
// ───────────────────────────────────────────
export const VipManager = {
  add(id: string, note?: string) {
    const jid = normalizeNumber(id);
    if (!jid) return false;

    const items = readAll();
    if (items.find(i => i.id === jid)) return false;

    const entry: VipEntry = {
      id: jid,
      note,
      addedAt: new Date().toISOString()
    };

    items.push(entry);
    writeAll(items);
    return true;
  },

  remove(id: string) {
    const jid = normalizeNumber(id);
    if (!jid) return false;

    let items = readAll();
    const lenBefore = items.length;

    items = items.filter(i => i.id !== jid);
    writeAll(items);

    return items.length < lenBefore;
  },

  isVip(id: string) {
    const jid = normalizeNumber(id);
    if (!jid) return false;

    const items = readAll();
    return items.some(i => i.id === jid);
  },

  list() {
    return readAll();
  },

  clearAll() {
    writeAll([]);
  }
};