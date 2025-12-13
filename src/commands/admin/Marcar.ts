export const meta = {
  name: "marcar",
  alias: ["marcar"],
  category: "admin",
  description: "Comando Uchiha Supremo: Marcar.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Marcar* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
