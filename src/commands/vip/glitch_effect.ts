// src/commands/vip/glitch_effect.ts
export const meta = {
  name: "glitch",
  aliases: ["glitch","glitcheffect"],
  permission: "vip",
  category: "vip",
  description: "Efeito glitch/art (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Glitch* 🔥\n\n🩸 O mundo treme com arte e ruído.\n\n_TODO: aplicar efeito glitch._`
  });
};
