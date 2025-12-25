import fs from "fs";
import path from "path";

const FILE = path.resolve("data/legendas.json");

/* ───── garantir arquivo ───── */
function ensureFile() {
  if (!fs.existsSync("data")) fs.mkdirSync("data");
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "{}");
}

/* ───── carregar ───── */
export function loadLegendas(): Record<string, any> {
  ensureFile();
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

/* ───── salvar ───── */
export function saveLegendas(data: Record<string, any>) {
  ensureFile();
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}
