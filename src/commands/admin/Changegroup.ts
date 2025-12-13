export const meta = {
  name: "changegroup",
  alias: ["changegroup"],
  category: "admin",
  description: "Comando Uchiha Supremo: Changegroup.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Changegroup* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
