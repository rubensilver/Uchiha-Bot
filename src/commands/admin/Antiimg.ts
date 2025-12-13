export const meta = {
  name: "antiimg",
  alias: ["antiimg"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antiimg.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antiimg* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
