export const meta = {
  name: "antidoc",
  alias: ["antidoc"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antidoc.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antidoc* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
