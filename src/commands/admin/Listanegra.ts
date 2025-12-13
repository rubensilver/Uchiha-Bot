export const meta = {
  name: "listanegra",
  alias: ["listanegra"],
  category: "admin",
  description: "Comando Uchiha Supremo: Listanegra.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Listanegra* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
