export const meta = {
  name: "totag",
  alias: ["totag"],
  category: "admin",
  description: "Comando Uchiha Supremo: Totag.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Totag* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
