// src/commands/vip/delvip.ts
export const meta = {
  name: "delvip",
  aliases: ["delvip","removevip"],
  permission: "admin",
  category: "vip",
  description: "Remove um VIP (uso: !delvip numero@s.whatsapp.net)"
};

export const run = async ({ sock, msg, args }: { sock: any; msg: any; args: string[] }) => {
  const id = args[0];
  if (!id) return sock.sendMessage(msg.key.remoteJid, { text: "⚠ Use: !delvip numero@s.whatsapp.net" });

  const { VipManager } = await import("../../vip/VipManager");
  const ok = VipManager.remove(id);
  if (ok) {
    return sock.sendMessage(msg.key.remoteJid, { text: `✅ VIP removido: ${id}` });
  } else {
    return sock.sendMessage(msg.key.remoteJid, { text: "⚠ Esse usuário não é VIP." });
  }
};
