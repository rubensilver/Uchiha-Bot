// src/core/commandHandler.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { getGroupAdminsCached } from "./AdminCache.js";
import { PermissionSystem } from "./PermissionSystem.js";
import { getCommand } from "../commands/commandHandler.js";

export async function executeCommand(
  sock: WASocket,
  msg: proto.IWebMessageInfo,
  commandName: string,
  args: string[]
): Promise<boolean> {

  const cmd = getCommand(commandName.toLowerCase());
  if (!cmd) return false;

  const jid = msg.key?.remoteJid;
  if (!jid) return true;

  const category = (cmd.meta.category || "").toLowerCase();

  let required: "owner" | "admin" | "user" = "user";
  if (category === "owner") required = "owner";
  else if (category.startsWith("admin")) required = "admin";

  const result = await PermissionSystem.checkPermission(
    sock,
    msg,
    required
  );

  if (!result.allowed) {
    await sock.sendMessage(jid, {
      text: `🔒 *Acesso negado*`
    });
    return true;
  }

  if (required === "admin" && jid.endsWith("@g.us")) {
  const cache = await getGroupAdminsCached(sock, jid);

  if (!cache.botIsAdmin) {
    await sock.sendMessage(jid, {
      text: `🌑 *Técnica selada*

O Uchiha está no clã,
mas *não possui cargo de administrador*.

👁️ *“Sem autoridade, nenhuma ordem é executada.”*`
      });
      return true;
    }
  }

  return true;
}