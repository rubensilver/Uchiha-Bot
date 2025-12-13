import * as fs from "fs";
import * as path from "path";

export type ConfigShape = {
  toggles: Record<string, 0 | 1>;
  ddlist: string[];           // lista de DDDs permitidos/removidos
  blacklist: string[];        // números banidos
  prefixes: string[];         // se usa multiprefixo, etc
  meta: Record<string, any>;
};

const CONFIG_PATH = path.join(__dirname, "../../data/admin-config.json");

const DEFAULT: ConfigShape = {
  toggles: {},
  ddlist: [],
  blacklist: [],
  prefixes: ["!"],
  meta: {}
};

export class AdminConfig {
  static load(): ConfigShape {
    try {
      if (!fs.existsSync(CONFIG_PATH)) {
        AdminConfig.save(DEFAULT);
        return DEFAULT;
      }
      const raw = fs.readFileSync(CONFIG_PATH, "utf8");
      return JSON.parse(raw) as ConfigShape;
    } catch (e) {
      console.error("AdminConfig.load error:", e);
      return DEFAULT;
    }
  }

  static save(conf: ConfigShape) {
    try {
      const dir = path.dirname(CONFIG_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(conf, null, 2), "utf8");
    } catch (e) {
      console.error("AdminConfig.save error:", e);
    }
  }

  static toggle(key: string, value?: 0 | 1) {
    const cfg = AdminConfig.load();
    const current = cfg.toggles[key] ?? 0;
    const next = typeof value === "number" ? value : (current === 1 ? 0 : 1);
    cfg.toggles[key] = next;
    AdminConfig.save(cfg);
    return next;
  }

  static getToggle(key: string) {
    const cfg = AdminConfig.load();
    return cfg.toggles[key] ?? 0;
  }

  static addDDD(ddd: string) {
    const cfg = AdminConfig.load();
    if (!cfg.ddlist.includes(ddd)) cfg.ddlist.push(ddd);
    AdminConfig.save(cfg);
    return cfg.ddlist;
  }

  static delDDD(ddd: string) {
    const cfg = AdminConfig.load();
    cfg.ddlist = cfg.ddlist.filter(x => x !== ddd);
    AdminConfig.save(cfg);
    return cfg.ddlist;
  }

  static addBlacklist(num: string) {
    const cfg = AdminConfig.load();
    if (!cfg.blacklist.includes(num)) cfg.blacklist.push(num);
    AdminConfig.save(cfg);
    return cfg.blacklist;
  }

  static delBlacklist(num: string) {
    const cfg = AdminConfig.load();
    cfg.blacklist = cfg.blacklist.filter(x => x !== num);
    AdminConfig.save(cfg);
    return cfg.blacklist;
  }

  static setPrefix(prefixes: string[]) {
    const cfg = AdminConfig.load();
    cfg.prefixes = prefixes;
    AdminConfig.save(cfg);
    return cfg.prefixes;
  }

  static getAll() { return AdminConfig.load(); }
}
