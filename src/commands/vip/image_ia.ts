// src/commands/vip/image_ia.ts
export const meta = {
  name: "imageia",
  aliases: ["imageia","imgai"],
  permission: "vip",
  category: "vip",
  description: "Gera imagem via IA (VIP)."
};

export const run = async ({ sock, msg, args }: { sock: any; msg: any; args: string[] }) => {
  const prompt = args.join(" ") || "Uchiha art";
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Imagem IA* 🔥\n\n🩸 Gerando imagem: ${prompt}\n\n_TODO: integrar DALL·E/StableDiffusion._`
  });
};
