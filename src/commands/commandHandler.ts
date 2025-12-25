// src/commands/commandHandler.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { Command, CommandContext } from "../types/Command";
import { PermissionSystem, RequiredLevel } from "../core/PermissionSystem";
import { tryHandleAdminAction } from "../core/adminActionRouter";

const commandRegistry = new Map<string, Command>();

/**
 * Registra um comando no registry (name + aliases)
 */
export function registerCommand(cmd: Command) {
  if (!cmd.meta.name) {
    console.warn("⚠️ Comando sem nome ignorado");
    return;
  }

  const name = cmd.meta.name.toLowerCase();
  commandRegistry.set(name, cmd);

  // Registrar aliases também
  if (cmd.meta.alias && Array.isArray(cmd.meta.alias)) {
    cmd.meta.alias.forEach((alias) => {
      commandRegistry.set(alias.toLowerCase(), cmd);
    });
  }

  console.log(`✅ Comando registrado: ${cmd.meta.name} (${cmd.meta.category ?? "sem categoria"})`);
}

/**
 * Executa um comando:
 * - valida permissões (baseado em cmd.meta.category, injetada pelo loader)
 * - se admin, tenta o router central de ações administrativas
 * - caso contrário, delega ao run() do comando
 */
export async function executeCommand(
  sock: WASocket,
  msg: proto.IWebMessageInfo,
  commandName: string,
  args: string[]
): Promise<boolean> {
  const cmd = commandRegistry.get(commandName.toLowerCase());
  if (!cmd) return false;

  try {
    const category = (cmd.meta.category || "").toLowerCase();
    let required: RequiredLevel = "user";
    if (category === "owner") required = "owner";
    else if (category === "admin" || category.startsWith("adm")) required = "admin";

    const allowed = await PermissionSystem.checkPermission(sock, msg, required);
    if (!allowed) {
      const jid = msg.key?.remoteJid;
      if (jid) {
        const permissionName = required === "owner" ? "Dono" : "Admin";
        await sock.sendMessage(jid, {
          text: `🔒 *Acesso Negado*\n\n👁️‍🗨️ Apenas ${permissionName} do Clã Uchiha pode usar este comando.\n\n🩸 *"O poder sem autoridade é fraqueza."*`
        });
      }
      return true;
    }

    // If admin category, try to handle common admin actions centrally
    if (required === "admin") {
      const handled = await tryHandleAdminAction(sock, msg, commandName, args);
      if (handled) return true; // router tratou e respondeu
    }

    // default: delegate to command.run
    const ctx: CommandContext = { sock, msg, args };
    await cmd.run(ctx);
    return true;
  } catch (err) {
    console.error(`❌ Erro ao executar comando ${commandName}:`, err);
    const jid = msg.key?.remoteJid;
    if (jid) {
      await sock.sendMessage(jid, { text: `⚠️ *Erro ao executar comando*\n\n🌑 *"Um erro perturbou o Sharingan."*` });
    }
    return true;
  }
}

/**
 * Lista comandos registrados
 */
export function listCommands() {
  const unique = new Map<string, Command>();
  commandRegistry.forEach((cmd) => {
    if (!unique.has(cmd.meta.name)) unique.set(cmd.meta.name, cmd);
  });
  return Array.from(unique.values());
}
