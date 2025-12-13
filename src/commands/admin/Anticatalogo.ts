export const meta = {
  name: "anticatalogo",
  alias: ["anticatalogo"],
  category: "admin",
  description: "Comando Uchiha Supremo: Anticatalogo.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Anticatalogo* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
