export const meta = {
  name: "legenda_video",
  alias: ["legenda_video"],
  category: "admin",
  description: "Comando Uchiha Supremo: Legenda_video.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Legenda_video* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
