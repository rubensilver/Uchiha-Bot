// src/commands/vip/addvip.ts
export const meta = {
  name: "addvip",
  aliases: ["addvip"],
  permission: "admin",
  category: "vip",
  description: "Adiciona um VIP (uso: !addvip numero@s.whatsapp.net [nota])"
};

export const run = async ({ sock, msg, args }: { sock: any; msg: any; args: string[] }) => {
  const id = args[0];
  const note = args.slice(1).join(" ") || undefined;

  if (!id) {
    return sock.sendMessage(msg.key.remoteJid, { text: "⚠ Use: !addvip numero@s.whatsapp.net [nota]" });
  }

  const { VipManager } = await import("../../vip/VipManager");
  const ok = VipManager.add(id, note);
  if (ok) {
    return sock.sendMessage(msg.key.remoteJid, { text: `✅ VIP adicionado: ${id}\n📝 ${note || "-"}` });
  } else {
    return sock.sendMessage(msg.key.remoteJid, { text: "⚠ Esse usuário já é VIP." });
  }
};
