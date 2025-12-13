export const meta = {
  name: "mute",
  alias: ["mute"],
  category: "admin",
  description: "Comando Uchiha Supremo: Mute.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Mute* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
