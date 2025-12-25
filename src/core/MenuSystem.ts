import { PrefixManager } from "../core/PrefixManager";
import { TextCenter } from "../core/TextCenter";
import { ThemeManager } from "../core/ThemeManager";

import { UCHIHA_THEME } from "../themes/uchihaTheme";
import { AKATSUKI_THEME } from "../themes/akatsukiTheme";
import { AMATERASU_THEME } from "../themes/amaterasuTheme";
import { MANGEKYOU_THEME } from "../themes/mangekyouTheme";
import { SUSANOO_THEME } from "../themes/susanooTheme";
import { UCHIHA_DARK_THEME } from "../themes/uchihaDarkTheme";

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