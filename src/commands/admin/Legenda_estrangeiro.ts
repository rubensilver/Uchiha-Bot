export const meta = {
  name: "legenda_estrangeiro",
  alias: ["legenda_estrangeiro"],
  category: "admin",
  description: "Comando Uchiha Supremo: Legenda_estrangeiro.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Legenda_estrangeiro* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
