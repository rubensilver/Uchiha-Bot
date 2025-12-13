export const meta = {
  name: "legenda_doc",
  alias: ["legenda_doc"],
  category: "admin",
  description: "Comando Uchiha Supremo: Legenda_Doc.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Legenda_Doc* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
