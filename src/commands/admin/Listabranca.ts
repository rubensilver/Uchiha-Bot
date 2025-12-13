export const meta = {
  name: "listabranca",
  alias: ["listabranca"],
  category: "admin",
  description: "Comando Uchiha Supremo: Listabranca.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Listabranca* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
