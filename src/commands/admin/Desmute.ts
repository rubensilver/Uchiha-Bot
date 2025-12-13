export const meta = {
  name: "desmute",
  alias: ["desmute"],
  category: "admin",
  description: "Comando Uchiha Supremo: Desmute.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Desmute* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
