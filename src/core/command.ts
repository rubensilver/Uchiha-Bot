import { WASocket, proto } from "@whiskeysockets/baileys";

export interface CommandContext {
  sock: WASocket;
  m: proto.IWebMessageInfo;
  args: string[];
}

export interface Command {
  meta: {
    name: string;
    alias?: string[];
    category?: string;
  };
  run: (ctx: CommandContext) => Promise<void>;
}
