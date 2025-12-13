export const meta = {
  name: "bemvindo",
  alias: ["bemvindo"],
  category: "admin",
  description: "Comando Uchiha Supremo: Bemvindo.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Bemvindo* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
