// src/core/commandHandler.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { getCommand } from "../commands/commandHandler";
import { checkAdmin } from "../utils/permissions";
import { VipManager } from "../vip/VipManager";
import { CommandContext } from "../types/Command";
import { PrefixManager } from "../core/PrefixManager";

export async function handleCommand(
  sock: WASocket,
  msg: proto.IWebMessageInfo,
  body: string
) {
  const jid = msg.key?.remoteJid;
  if (!jid) return;

  const prefix = PrefixManager.getPrefix();
  const args = body.slice(prefix.length).trim().split(/\s+/);
  const name = args.shift()?.toLowerCase();
  if (!name) return;

  const cmd = getCommand(name);
  if (!cmd) return;

  const sender = msg.key.participant ?? jid;

  if (cmd.meta.category === "admin") {
    const perm = await checkAdmin(sock, msg);

    if (!perm.isGroup) {
      return sock.sendMessage(jid, {
        text: "🛑 『Uchiha』 Este jutsu só pode ser usado em grupo."
      });
    }

    if (!perm.senderIsAdmin) {
      return sock.sendMessage(jid, {
        text: "🛑 『Uchiha』 Apenas líderes podem executar este selo."
      });
    }
  }

  if (cmd.meta.category === "vip") {
    if (!VipManager.isVip(sender)) {
      return sock.sendMessage(jid, {
        text: "💎 『Uchiha』 Este jutsu pertence apenas aos escolhidos VIP."
      });
    }
  }

  const ctx: CommandContext = { sock, msg, args };
  await cmd.run(ctx);
}