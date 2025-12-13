// src/commands/vip/autocaption.ts
export const meta = {
  name: "autocaption",
  aliases: ["autocaption","legendas"],
  permission: "vip",
  category: "vip",
  description: "Gera legenda automática (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — AutoCaption* 🔥\n\n🩸 Palavras que descrevem a cena... (integração IA necessária)\n\n_TODO: OCR/Caption API._`
  });
};
