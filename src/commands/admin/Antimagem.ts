export const meta = {
  name: "antimagem",
  alias: ["antimagem"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antimagem.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antimagem* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
