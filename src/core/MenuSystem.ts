import { PrefixManager } from "../core/PrefixManager.js";
import { TextCenter } from "../core/TextCenter.js";
import { ThemeManager } from "../core/ThemeManager.js";

import { UCHIHA_THEME } from "../themes/uchihaTheme.js";
import { AKATSUKI_THEME } from "../themes/akatsukiTheme.js";
import { AMATERASU_THEME } from "../themes/amaterasuTheme.js";
import { MANGEKYOU_THEME } from "../themes/mangekyouTheme.js";
import { SUSANOO_THEME } from "../themes/susanooTheme.js";
import { UCHIHA_DARK_THEME } from "../themes/uchihaDarkTheme.js";

export class MenuSystem {
  static getTheme() {
    const current = ThemeManager.getCurrentTheme();

    switch (current) {
      case "akatsukiTheme": return AKATSUKI_THEME;
      case "mangekyouTheme": return MANGEKYOU_THEME;
      case "susanooTheme": return SUSANOO_THEME;
      case "amaterasuTheme": return AMATERASU_THEME;
      case "uchihaDarkTheme": return UCHIHA_DARK_THEME;
      default: return UCHIHA_THEME;
    }
  }

  static header(title: string): string {
    const theme = this.getTheme();
    return `${theme.border}
║${TextCenter.center(title)}║
  }

  static footer(): string {
    const theme = this.getTheme();
${theme.borderEnd}

${theme.footer}`;
  }
}