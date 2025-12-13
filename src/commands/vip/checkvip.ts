// src/commands/vip/checkvip.ts
export const meta = {
  name: "checkvip",
  aliases: ["checkvip","isvip"],
  permission: "public",
  category: "vip",
  description: "Verifica se o usuário ou id é VIP. Uso: !checkvip [@mencionar|numero|id]"
};

export const run = async ({ sock, msg, args }: { sock: any; msg: any; args: string[] }) => {
  const { VipManager } = await import("../../vip/VipManager");
  // se mencionou, pega mencionados
  const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
  const target = mentioned[0] || args[0] || msg.key.participant || msg.key.remoteJid;
  if (!target) return sock.sendMessage(msg.key.remoteJid, { text: "⚠ Forneça um usuário (mencione ou digite o número)." });

  const ok = VipManager.isVip(target);
  return sock.sendMessage(msg.key.remoteJid, { text: ok ? `🔓 ${target} é VIP.` : `🔒 ${target} NÃO é VIP.` });
};
