export const meta = {
  name: "grupo",
  alias: ["grupo"],
  category: "admin",
  description: "Comando Uchiha Supremo: Grupo.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Grupo* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
