export const meta = {
  name: "antipalavrao",
  alias: ["antipalavrao"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antipalavrao.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antipalavrao* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
