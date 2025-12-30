// src/types/Command.ts
import { WASocket, proto } from "@whiskeysockets/baileys";

export interface CommandContext {
  sock: WASocket;
  msg: proto.IWebMessageInfo;
  args: string[];
  userJid: string;
  userName: string;

  reply: (text: string) => Promise<void>;
  mention: (text: string) => Promise<void>;
}

export interface Command {
  meta: {
    name: string;
    alias?: string[];
    category?: string;
    description?: string;
  };
  run: (ctx: CommandContext) => Promise<unknown>;
}