// src/commands/vip/anime_effect.ts
export const meta = {
  name: "animeffect",
  aliases: ["anime","animeffect"],
  permission: "vip",
  category: "vip",
  description: "Aplica efeito anime (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Anime Effect* 🔥\n\n🩸 A alma se torna anime. (responda à imagem)\n\n_TODO: aplicar filtro anime._`
  });
};
