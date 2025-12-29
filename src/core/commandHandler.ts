// src/core/commandHandler.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { getCommand } from "../commands/commandHandler.js";
import { PermissionSystem } from "./PermissionSystem.js";
import { getCommand } from "../commands/commandHandler.js";

/**
 * Verifica se o BOT é ADMIN no grupo
 * (admin comum já basta)
 */
async function isBotAdmin(
  sock: WASocket,
  jid: string
): Promise<boolean> {
  if (!sock.user) return false;
  
  const metadata = await sock.groupMetadata(jid);
  const botJid = sock.user?.id?.split(":")[0] + "@s.whatsapp.net";

  const bot = metadata.participants.find(p => p.id === botJid);
  return bot?.admin != null;
}

/**
 * CORE:
 * - NÃO registra comandos
 * - NÃO guarda comandos
 * - NÃO cria CommandContext
 * - APENAS valida permissão e delega execução
 */
export async function executeCommand(
  sock: WASocket,
  msg: proto.IWebMessageInfo,
  commandName: string,
  args: string[]
): Promise<boolean> {

  // busca o comando
  const cmd = getCommand(commandName.toLowerCase());
  if (!cmd) return false;

  const jid = msg.key?.remoteJid;
  if (!jid) return true;

  // inferir permissão pela categoria
  const category = (cmd.meta.category || "").toLowerCase();

  let required: "owner" | "admin" | "user" = "user";
  if (category === "owner") required = "owner";
  else if (category === "admin" || category.startsWith("adm")) required = "admin";

  // valida permissão do USUÁRIO
  const allowed = await PermissionSystem.checkPermission(
    sock,
    msg,
    required
  );

  if (!allowed) {
    const name =
      required === "owner"
        ? "Dono"
        : required === "admin"
        ? "Admin"
        : "Usuário";

    await sock.sendMessage(jid, {
      text: `🔒 *Acesso Negado*\n\nApenas *${name}* pode usar este comando.`
    });
    return true;
  }

  // 🔥 VERIFICAÇÃO REAL: BOT PRECISA SER ADMIN
  if (required === "admin" && jid.endsWith("@g.us")) {
    const botIsAdmin = await isBotAdmin(sock, jid);

    if (!botIsAdmin) {
      await sock.sendMessage(jid, {
        text: `🌑 *Técnica selada*

O Uchiha está no clã,
mas *não possui cargo de administrador*.

👁️ *“Sem autoridade, nenhuma ordem é executada.”*`
      });
      return true;
    }
  }

  // permissão válida + bot apto
  return true;
}