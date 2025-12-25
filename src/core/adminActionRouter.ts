// src/core/adminActionRouter.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { AdminConfig } from "../admin/AdminConfig";

/**
 * Tenta tratar comandos administrativos "comuns" centralmente.
 * Retorna true se tratou o comando (não deve depois executar run()), false caso contrário.
 *
 * Padrões tratados:
 * - anti-<nome> on|off  -> salva toggle 'anti-<nome>'
 * - auto-<nome> on|off  -> salva toggle 'auto-<nome>'
 * - add-ddd <ddd> / del-ddd <ddd>
 * - add-black <num> / del-black <num>
 * - set-prefix <prefix>
 *
 * Mantém tema Uchiha nas mensagens.
 */

export async function tryHandleAdminAction(sock: WASocket, msg: proto.IWebMessageInfo, commandName: string, args: string[]): Promise<boolean> {
  const jid = msg.key?.remoteJid;
  if (!jid) return false;

  const send = async (text: string, mentions?: string[]) => {
    try { await sock.sendMessage(jid, { text, mentions }); } catch {}
  };

  // anti-* and auto-* toggles
  if ((commandName.startsWith("anti-") || commandName.startsWith("auto-")) && args.length > 0) {
    const action = args[0].toLowerCase();
    if (!["on","off"].includes(action)) {
      await send(`❌ Uso: ${commandName} <on|off>\n\n🌑 *"O selo precisa de precisão."*`);
      return true;
    }
    const key = commandName; // e.g., 'anti-doc' or 'auto-repo'
    const value = action === "on" ? 1 : 0;
    AdminConfig.toggle(key, value);
    await send(action === "on"
      ? `🔒 *${commandName.toUpperCase()} ATIVADO*\n\n👁️ *"O Sharingan agora vigia essa função."*`
      : `🔓 *${commandName.toUpperCase()} DESATIVADO*\n\n🌑 *"A escuridão retorna."*`);
    return true;
  }

  // DDD list
  if (commandName === "add-ddd" && args[0]) {
    const ddd = args[0];
    AdminConfig.addDDD(ddd);
    await send(`✅ DDD ${ddd} adicionado à lista do Clã.`);
    return true;
  }
  if (commandName === "del-ddd" && args[0]) {
    const ddd = args[0];
    AdminConfig.delDDD(ddd);
    await send(`✅ DDD ${ddd} removido da lista do Clã.`);
    return true;
  }

  // blacklist / ban
  if ((commandName === "add-black" || commandName === "ban") && args[0]) {
    const num = args[0];
    AdminConfig.addBlacklist(num);
    await send(`⛔ Número ${num} adicionado à blacklist.`);
    return true;
  }
  if ((commandName === "del-black" || commandName === "unban") && args[0]) {
    const num = args[0];
    AdminConfig.delBlacklist(num);
    await send(`✅ Número ${num} removido da blacklist.`);
    return true;
  }

  // prefix
  if (commandName === "set-prefix" && args[0]) {
    const prefixes = [args[0]];
    AdminConfig.setPrefix(prefixes);
    await send(`✅ Prefix definido: ${args[0]}\n\n👁️ *"Os selos agora obedecem esse novo símbolo."*`);
    return true;
  }

  return false;
}
