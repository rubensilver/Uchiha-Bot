import * as fs from "fs";
import * as path from "path";

export class PrefixManager {
  static prefixFile = path.join(__dirname, "../config/prefix.json");

  static getPrefix(): string {
    if (!fs.existsSync(this.prefixFile)) {
      return "!";
    }
    const data = JSON.parse(fs.readFileSync(this.prefixFile, "utf8"));
    return data.prefix || "!";
  }

  static setPrefix(p: string) {
    fs.writeFileSync(this.prefixFile, JSON.stringify({ prefix: p }, null, 2));
  }
}