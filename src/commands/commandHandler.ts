// src/commands/commandHandler.ts
import { loadCommands } from "./loader";
import * as path from "path";
import { VipManager } from "../vip/VipManager";

const adminCommands = loadCommands(path.join(__dirname, "admin"));
const vipCommands = loadCommands(path.join(__dirname, "vip"));
const jogosCommands = loadCommands(path.join(__dirname, "jogos"));

// Merge maps (admin + vip). vipCommands should not override admin commands.
const commands = new Map<string, any>(adminCommands);
for (const [k, v] of vipCommands) {
  if (!commands.has(k)) commands.set(k, v);
}

function isMsgFromAdmin(msg: any) {
  // se existir participant (em grupos) e terminar com @, considere admin check.
  // Aqui só checamos se a mensagem veio de um participante (um ID).
  // A verificação 'é admin' real depende de você obter lista de admins do grupo (opcional).
  // Neste handler, 'admin' permission significa "apenas mensagens com participant (membros)"
  // Para checar admin real, você precisa do status do dono do grupo via Baileys (não implementado aqui).
  return Boolean(msg.key.participant?.includes("@"));
}

export async function handleCommand(sock: any, msg: any, body: string) {
  const prefix = "!";

  if (!body.startsWith(prefix)) return;

  const args = body.slice(1).trim().split(" ").filter(Boolean);
  const cmdName = (args.shift() || "").toLowerCase();

  if (!cmdName) return;

  const cmd = commands.get(cmdName);
  if (!cmd) return; // comando não existe

  // Permissão: admin
  if (cmd.meta?.permission === "admin") {
    if (!isMsgFromAdmin(msg)) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Apenas administradores podem usar este comando."
      });
    }
  }

  // Permissão: vip
  if (cmd.meta?.permission === "vip") {
    // allow if user is vip OR message came from an admin (server admin)
    const userId = msg.key.participant ?? msg.key.remoteJid;
    const allowed = VipManager.isVip(userId) || isMsgFromAdmin(msg);
    if (!allowed) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "🔒 Este comando é exclusivo para VIPs. Use `!checkvip` para verificar."
      });
    }
  }

  try {
    // Detecta automaticamente a forma da função:
    // run({ sock, msg, args }) OU run(sock, msg, args)
    if (cmd.run.length === 1) {
      await cmd.run({ sock, msg, args });
    } else {
      await cmd.run(sock, msg, args);
    }
  } catch (e) {
    console.error("Erro ao executar comando:", cmdName, e);
    await sock.sendMessage(msg.key.remoteJid, {
      text: "❌ Erro ao executar o comando."
    });
  }
}