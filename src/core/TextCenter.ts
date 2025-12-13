export class TextCenter {
  static center(text: string, width: number = 56): string {
    const len = text.length;
    if (len >= width) return text;
    const left = Math.floor((width - len) / 2);
    const right = width - len - left;
    return " ".repeat(left) + text + " ".repeat(right);
  }
}
