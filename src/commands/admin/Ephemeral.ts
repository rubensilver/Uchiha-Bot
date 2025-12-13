export const meta = {
  name: "ephemeral",
  alias: ["ephemeral"],
  category: "admin",
  description: "Comando Uchiha Supremo: Ephemeral.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Ephemeral* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
