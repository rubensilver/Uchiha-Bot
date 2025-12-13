// src/commands/vip/cartoon_effect.ts
export const meta = {
  name: "cartoon",
  aliases: ["cartoon","cartoonify"],
  permission: "vip",
  category: "vip",
  description: "Efeito cartoon (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Cartoon* 🔥\n\n🩸 A face torna-se desenho.\n\n_TODO: aplicar efeito cartoon._`
  });
};
