// src/commands/vip/stickerpro.ts
export const meta = {
  name: "stickerpro",
  aliases: ["stickerpro","stickerplus"],
  permission: "vip",
  category: "vip",
  description: "Sticker PRO com bordas e efeitos (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Sticker PRO* 🔥\n\n🩸 Transformarei essa imagem em sticker com efeitos do Clã Uchiha.\n\n_TODO: geração de sticker e envio._`
  });
};
