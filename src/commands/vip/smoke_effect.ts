// src/commands/vip/smoke_effect.ts
export const meta = {
  name: "smoke",
  aliases: ["smoke","smokeeffect"],
  permission: "vip",
  category: "vip",
  description: "Efeito fumaça (VIP)."
};

export const run = async ({ sock, msg }: { sock: any; msg: any }) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🔥 *Uchiha VIP — Smoke* 🔥\n\n🩸 A névoa envolve e revela.\n\n_TODO: aplicar efeito smoke._`
  });
};
