// src/commands/vip/listvip.ts
export const meta = {
  name: "listvip",
  aliases: ["listvip","vips"],
  permission: "admin",
  category: "vip",
  description: "Lista todos os VIPs"
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  const { VipManager } = await import("../../vip/VipManager");
  const all = VipManager.list();
  if (!all.length) {
    return sock.sendMessage(msg.key.remoteJid, { text: "📋 Não há VIPs cadastrados." });
  }
  const lines = all.map((v: any, i: number) => `${i+1}. ${v.id} — ${v.note || "-"} (adicionado: ${v.addedAt})`);
  return sock.sendMessage(msg.key.remoteJid, { text: `📋 VIPs:\n\n${lines.join("\n")}` });
};
