export const meta = {
  name: "addlistabranca",
  alias: ["addlistabranca"],
  category: "admin",
  description: "Comando Uchiha Supremo: Addlistabranca.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Addlistabranca* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
