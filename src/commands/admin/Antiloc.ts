export const meta = {
  name: "antiloc",
  alias: ["antiloc"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antiloc.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antiloc* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
