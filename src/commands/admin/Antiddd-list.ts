export const meta = {
  name: "antiddd-list",
  alias: ["antiddd-list"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antiddd-list.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antiddd-list* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
