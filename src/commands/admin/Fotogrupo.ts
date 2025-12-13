export const meta = {
  name: "fotogrupo",
  alias: ["fotogrupo"],
  category: "admin",
  description: "Comando Uchiha Supremo: Fotogrupo.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Fotogrupo* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
