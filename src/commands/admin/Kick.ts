export const meta = {
  name: "kick",
  alias: ["kick"],
  category: "admin",
  description: "Comando Uchiha Supremo: Kick.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Kick* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
