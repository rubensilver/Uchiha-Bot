export const meta = {
  name: "fechargp",
  alias: ["fechargp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Fechargp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Fechargp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
