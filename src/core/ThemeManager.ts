import * as fs from "fs";
import * as path from "path";

export class ThemeManager {
  static themeFile = path.join(__dirname, "../config/theme.json");

  static getCurrentTheme(): string {
    if (!fs.existsSync(this.themeFile)) {
      return "uchihaTheme";
    }

    const data = JSON.parse(fs.readFileSync(this.themeFile, "utf8"));
    return data.theme || "uchihaTheme";
  }

  static setTheme(name: string) {
    fs.writeFileSync(this.themeFile, JSON.stringify({ theme: name }, null, 2));
  }
}