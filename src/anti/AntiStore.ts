import fs from "fs";
import path from "path";

const FILE = path.resolve("data/anti.json");

/**
 * Estruturas
 */
type AntiState = {
  enabled: boolean;
  warns: Record<string, number>;
};

type GroupConfig = {
  maxWarn?: number;
  mode?: "warn" | "kick";
  commandMode?: "all" | "adms";
  ephemeral?: number;
  nsfw?: boolean;
  tempoCmd?: number;

  // 🔥 ADICIONAR
  anagrama?: boolean;
};

type GroupState = {
  whitelist?: string[];
  config?: GroupConfig;
  [anti: string]: any;
};

type Store = Record<string, GroupState>;

let cache: Store = {};

/**
 * Persistência
 */
function save() {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(cache, null, 2));
}

function load() {
  if (fs.existsSync(FILE)) {
    cache = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  }
}

load();

/**
 * Helpers internos
 */
function ensureGroup(jid: string) {
  cache[jid] ??= {};
}

function ensureAnti(jid: string, anti: string) {
  ensureGroup(jid);
  cache[jid][anti] ??= { enabled: true, warns: {} } as AntiState;
}

/**
 * Store público
 */
export const AntiStore = {
  /* ───── Anti ───── */
  isEnabled(jid: string, anti: string) {
    return cache[jid]?.[anti]?.enabled === true;
  },

  enable(jid: string, anti: string) {
    ensureAnti(jid, anti);
    cache[jid][anti].enabled = true;
    save();
  },

  disable(jid: string, anti: string) {
    ensureAnti(jid, anti);
    cache[jid][anti].enabled = false;
    save();
  },

  /* ───── Warns ───── */
  addWarn(jid: string, anti: string, user: string) {
    ensureAnti(jid, anti);
    cache[jid][anti].warns[user] =
      (cache[jid][anti].warns[user] || 0) + 1;
    save();
    return cache[jid][anti].warns[user];
  },

  resetWarn(jid: string, anti: string, user: string) {
    ensureAnti(jid, anti);
    delete cache[jid][anti].warns[user];
    save();
  },

  /* ───── Config (JÁ EXISTENTE) ───── */
  getMaxWarn(jid: string): number {
    return cache[jid]?.config?.maxWarn ?? 2;
  },

  setMaxWarn(jid: string, value: number) {
    ensureGroup(jid);
    cache[jid].config ??= {};
    cache[jid].config.maxWarn = value;
    save();
  },

  getMode(jid: string): "warn" | "kick" {
    return cache[jid]?.config?.mode ?? "kick";
  },

  setMode(jid: string, mode: "warn" | "kick") {
    ensureGroup(jid);
    cache[jid].config ??= {};
    cache[jid].config.mode = mode;
    save();
  },

  /* ───── 🔥 NOVO: CONFIG COMPLETA ───── */
  getConfig(jid: string): GroupConfig {
    ensureGroup(jid);
    return cache[jid].config ?? {};
  },

  setConfig(jid: string, config: Partial<GroupConfig>) {
    ensureGroup(jid);
    cache[jid].config ??= {};
    Object.assign(cache[jid].config, config);
    save();
  },

  /* ───── Whitelist ───── */
  isWhitelisted(jid: string, user: string): boolean {
    return cache[jid]?.whitelist?.includes(user) === true;
  },

  addWhitelist(jid: string, user: string) {
    ensureGroup(jid);
    cache[jid].whitelist ??= [];
    if (!cache[jid].whitelist.includes(user)) {
      cache[jid].whitelist.push(user);
      save();
    }
  },

  removeWhitelist(jid: string, user: string) {
    if (!cache[jid]?.whitelist) return;
    cache[jid].whitelist = cache[jid].whitelist.filter(u => u !== user);
    save();
  },

  getWhitelist(jid: string): string[] {
    return cache[jid]?.whitelist ?? [];
  }
};