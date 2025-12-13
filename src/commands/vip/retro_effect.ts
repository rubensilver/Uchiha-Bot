// src/commands/vip/retro_effect.ts
export const meta = {
  name: "retro",
  aliases: ["retro","retroeffect"],
  permission: "vip",
  category: "vip",
  description: "Efeito retrô/vintage (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Retro* 🔥\n\n🩸 Memórias antigas, preservadas em sépia.\n\n_TODO: aplicar efeito retro._`
  });
};
