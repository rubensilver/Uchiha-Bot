// src/commands/vip/colorize.ts
export const meta = {
  name: "colorize",
  aliases: ["colorize","colorizar"],
  permission: "vip",
  category: "vip",
  description: "Coloriza fotos em P&B (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Colorize* 🔥\n\n🩸 O Sharingan tenta devolver vida às sombras. (responda a uma imagem)\n\n_TODO: integrar serviço de colorização._`
  });
};
