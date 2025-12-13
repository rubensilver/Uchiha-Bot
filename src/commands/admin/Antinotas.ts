export const meta = {
  name: "antinotas",
  alias: ["antinotas"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antinotas.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antinotas* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
