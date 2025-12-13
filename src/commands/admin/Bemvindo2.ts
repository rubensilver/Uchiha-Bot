export const meta = {
  name: "bemvindo2",
  alias: ["bemvindo2"],
  category: "admin",
  description: "Comando Uchiha Supremo: Bemvindo2.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Bemvindo2* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
