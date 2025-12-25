import { WASocket, proto } from "@whiskeysockets/baileys";
import { Command, CommandContext } from "../types/Command";

// Registry de comandos
const commandRegistry = new Map<string, Command>();

/**
 * Registra um comando no registry
 */
export function registerCommand(cmd: Command) {
  if (!cmd.meta.name) {
    console.warn("⚠️ Comando sem nome ignorado");
    return;
  }

  commandRegistry.set(cmd.meta. name. toLowerCase(), cmd);

  // Registrar aliases também
  if (cmd.meta. alias && Array.isArray(cmd.meta.alias)) {
    cmd.meta.alias.forEach((alias) => {
      commandRegistry.set(alias.toLowerCase(), cmd);
    });
  }

  console.log(`✅ Comando registrado: ${cmd.meta. name}`);
}

/**
 * Executa um comando pelo nome
 */
export async function executeCommand(
  commandName: string,
  ctx: CommandContext
): Promise<boolean> {
  const cmd = commandRegistry.get(commandName. toLowerCase());

  if (!cmd) {
    return false;
  }

  try {
    await cmd.run(ctx);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao executar comando ${commandName}:`, error);
    return false;
  }
}

/**
 * Lista todos os comandos registrados
 */
export function listCommands(): Command[] {
  const unique = new Map<string, Command>();
  commandRegistry.forEach((cmd, key) => {
    if (!unique.has(cmd.meta.name)) {
      unique.set(cmd.meta. name, cmd);
    }
  });
  return Array.from(unique.values());
}

/**
 * Obtém um comando pelo nome
 */
export function getCommand(name: string): Command | undefined {
  return commandRegistry.get(name.toLowerCase());
}
