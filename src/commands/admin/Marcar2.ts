export const meta = {
  name: "marcar2",
  alias: ["marcar2"],
  category: "admin",
  description: "Comando Uchiha Supremo: Marcar2.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Marcar2* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
