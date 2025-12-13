// src/commands/vip/logo_premium.ts
export const meta = {
  name: "logopremium",
  aliases: ["logo","logopremium"],
  permission: "vip",
  category: "vip",
  description: "Gera logos premium estilo Uchiha (VIP)."
};

export const run = async ({ sock, msg, args }: { sock: any; msg: any; args: string[] }) => {
  const text = args.join(" ") || "SEU NOME";
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Logo Premium* 🔥\n\n🩸 Criando logo: ${text}\n\n_TODO: integrar gerador de logos._`
  });
};
