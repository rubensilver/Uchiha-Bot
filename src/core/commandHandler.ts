// src/core/commandHandler.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { Command, CommandContext } from "../types/Command";
import { PermissionSystem } from "./PermissionSystem";

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
 * Executa um comando pelo nome — o handler valida permissões aqui.
 * O nível de permissão é inferido automaticamente a partir de cmd.meta.category,
 * que é preenchido pelo loader (index.ts) com base na pasta do ficheiro.
 */
export async function executeCommand(
  sock: WASocket,
  msg: proto.IWebMessageInfo,
  commandName: string,
  args: string[]
): Promise<boolean> {
  const cmd = commandRegistry.get(commandName.toLowerCase());

  if (!cmd) {
    return false;
  }

  try {
    // Inferir nível requerido pela categoria do comando (não do ficheiro)
    const category = (cmd.meta.category || "").toLowerCase();

    // Mapeamento: pasta 'owner' => owner, 'admin' => admin, qualquer outro => user
    let required: "owner" | "admin" | "user" = "user";
    if (category === "owner") required = "owner";
    else if (category === "admin" || category.startsWith("adm")) required = "admin";

    // Verifica permissões via PermissionSystem (tudo centralizado no handler)
    const allowed = await PermissionSystem.checkPermission(sock, msg, required);

    if (!allowed) {
      const jid = msg.key?.remoteJid;
      if (jid) {
        const permissionName = required === "owner" ? "Dono" : "Admin";
        await sock.sendMessage(jid, {
          text: `🔒 *Acesso Negado*\n\n👁️‍🗨️ Apenas ${permissionName} do Clã Uchiha pode usar este comando.\n\n🩸 *"O poder sem autoridade é fraqueza."*`
        });
      }
      // retornamos true porque o comando foi reconhecido, mas não executado por permissão
      return true;
    }

    const ctx: CommandContext = {
      sock,
      msg,
      args
    };

    // Executa o comando (os ficheiros de comando não precisam declarar permissões)
    await cmd.run(ctx);
    return true;
  } catch (err) {
    console.error(`❌ Erro ao executar comando ${commandName}:`, err);
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
 * Listar comandos (opcional)
 */
export function listCommands(): Command[] {
  const unique = new Map<string, Command>();
  commandRegistry.forEach((cmd) => {
    if (!unique.has(cmd.meta.name)) unique.set(cmd.meta.name, cmd);
  });
  return Array.from(unique.values());
}
