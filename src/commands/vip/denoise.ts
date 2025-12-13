// src/commands/vip/denoise.ts
export const meta = {
  name: "denoise",
  aliases: ["denoise","removerruido"],
  permission: "vip",
  category: "vip",
  description: "Remove ruído da imagem (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Denoise* 🔥\n\n🩸 Limparei o ruído e trarei clareza.\n\n_TODO: integrar algoritmo denoise._`
  });
};
