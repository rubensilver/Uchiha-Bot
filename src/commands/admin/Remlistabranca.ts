export const meta = {
  name: "remlistabranca",
  alias: ["remlistabranca"],
  category: "admin",
  description: "Comando Uchiha Supremo: Remlistabranca.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Remlistabranca* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
