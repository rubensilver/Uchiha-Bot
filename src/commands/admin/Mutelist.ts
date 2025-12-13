export const meta = {
  name: "mutelist",
  alias: ["mutelist"],
  category: "admin",
  description: "Comando Uchiha Supremo: Mutelist.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Mutelist* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
