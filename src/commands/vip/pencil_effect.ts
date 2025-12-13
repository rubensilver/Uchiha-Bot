// src/commands/vip/pencil_effect.ts
export const meta = {
  name: "pencileffect",
  aliases: ["pencil","pencileffect"],
  permission: "vip",
  category: "vip",
  description: "Efeito lápis (sketch) (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Sketch* 🔥\n\n🩸 Traços e memórias desenhados.\n\n_TODO: aplicar sketch filter._`
  });
};
