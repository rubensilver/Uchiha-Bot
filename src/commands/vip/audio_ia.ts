// src/commands/vip/audio_ia.ts
export const meta = {
  name: "audioia",
  aliases: ["audioia","vozai"],
  permission: "vip",
  category: "vip",
  description: "Gera áudio via IA (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Áudio IA* 🔥\n\n🩸 Em breve a voz do clã se manifestará.\n\n_TODO: integrar TTS IA._`
  });
};
