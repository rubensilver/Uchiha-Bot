export const meta = {
  name: "antienquete",
  alias: ["antienquete"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antienquete.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antienquete* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
