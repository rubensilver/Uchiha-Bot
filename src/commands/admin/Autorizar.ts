export const meta = {
  name: "autorizar",
  alias: ["autorizar"],
  category: "admin",
  description: "Comando Uchiha Supremo: Autorizar.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Autorizar* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
