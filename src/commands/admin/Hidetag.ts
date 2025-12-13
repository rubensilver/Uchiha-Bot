export const meta = {
  name: "hidetag",
  alias: ["hidetag"],
  category: "admin",
  description: "Comando Uchiha Supremo: Hidetag.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Hidetag* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
