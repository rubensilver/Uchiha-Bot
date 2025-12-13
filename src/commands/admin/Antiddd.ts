export const meta = {
  name: "antiddd",
  alias: ["antiddd"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antiddd.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antiddd* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
