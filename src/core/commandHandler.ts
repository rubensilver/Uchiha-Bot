import { WASocket, proto } from "@whiskeysockets/baileys";
import { Command, CommandContext } from "../types/Command";
import { PermissionSystem, PermissionLevel } from "./PermissionSystem";

const commandRegistry = new Map<string, Command>();

/**
 * Registra um comando
 */
export function registerCommand(cmd: Command) {
  if (!cmd.meta.name) {
    console.warn("⚠️ Comando sem nome ignorado");
    return;
  }

  const name = cmd.meta.name. toLowerCase();
  commandRegistry.set(name, cmd);

  // Registrar aliases
  if (cmd.meta.alias && Array.isArray(cmd.meta. alias)) {
    cmd.meta.alias.forEach((alias) => {
      commandRegistry.set(alias.toLowerCase(), cmd);
    });
  }

  console.log(`✅ Comando registrado: ${cmd.meta.name} (${cmd.meta.category || "sem categoria"})`);
}

/**
 * Executa um comando com validação de permissões
 */
export async function executeCommand(
  sock: WASocket,
  msg: proto.IWebMessageInfo,
  commandName: string,
  args: string[]
): Promise<boolean> {
  const cmd = commandRegistry.get(commandName. toLowerCase());

  if (!cmd) {
    return false;
  }

  try {
    // Definir nível de permissão requerido baseado na categoria
    let requiredLevel = PermissionLevel.USER;
    
    if (cmd.meta.category === "admin") {
      requiredLevel = PermissionLevel.ADMIN;
    } else if (cmd. meta.category === "owner") {
      requiredLevel = PermissionLevel.OWNER;
    }

    // Validar permissão
    const hasPermission = await PermissionSystem.checkPermission(sock, msg, requiredLevel);

    if (!hasPermission) {
      const jid = msg.key?.remoteJid;
      if (jid) {
        const permissionName = requiredLevel === PermissionLevel. OWNER ? "Dono" : "Admin";
        await sock.sendMessage(jid, {
          text: `🔒 *Acesso Negado*\n\n👁️‍🗨️ Apenas ${permissionName} do Clã Uchiha pode usar este comando.\n\n🩸 *"O poder sem autoridade é fraqueza."*`
        });
      }
      return true; // Comando foi "encontrado", mas sem permissão
    }

    // Criar contexto
    const ctx: CommandContext = {
      sock,
      msg,
      args
    };

    // Executar
    await cmd.run(ctx);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao executar comando ${commandName}:`, error);
    const jid = msg.key?.remoteJid;
    if (jid) {
      await sock.sendMessage(jid, {
        text: `⚠️ *Erro ao executar comando*\n\n🌑 *"Um erro perturbou o Sharingan."*`
      });
    }
    return true;
  }
}

/**
 * Lista comandos por categoria
 */
export function listCommandsByCategory(category?:  string): Command[] {
  const unique = new Map<string, Command>();
  commandRegistry.forEach((cmd) => {
    if (! unique.has(cmd.meta.name)) {
      if (! category || cmd.meta.category === category) {
        unique.set(cmd.meta.name, cmd);
      }
    }
  });
  return Array.from(unique.values());
}

/**
 * Obtém um comando
 */
export function getCommand(name: string): Command | undefined {
  return commandRegistry.get(name.toLowerCase());
}
