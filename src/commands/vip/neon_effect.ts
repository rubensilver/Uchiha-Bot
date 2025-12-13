// src/commands/vip/neon_effect.ts
export const meta = {
  name: "neoneffect",
  aliases: ["neon","neoneffect"],
  permission: "vip",
  category: "vip",
  description: "Efeito neon profissional (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Neon Effect* 🔥\n\n🩸 Luzes e sombras moldadas pela chama.\n\n_TODO: aplicar efeito neon._`
  });
};
