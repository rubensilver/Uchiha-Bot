export const meta = {
  name: "antipalavra",
  alias: ["antipalavra"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antipalavra.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antipalavra* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
