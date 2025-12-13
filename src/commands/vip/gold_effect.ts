// src/commands/vip/gold_effect.ts
export const meta = {
  name: "gold",
  aliases: ["gold","goldeffect"],
  permission: "vip",
  category: "vip",
  description: "Efeito dourado premium (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Gold* 🔥\n\n🩸 Dourado como a chama dos Uchihas.\n\n_TODO: aplicar efeito dourado._`
  });
};
