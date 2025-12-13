export function buildTheme(text: string) {
  return {
    border: "╔" + "═".repeat(56) + "╗",
    borderEnd: "╚" + "═".repeat(56) + "╝",
    empty: "║" + " ".repeat(56) + "║",
    footer: "🔥 Uchiha Bot — Poder Absoluto 🔥",
    text
  };
}
