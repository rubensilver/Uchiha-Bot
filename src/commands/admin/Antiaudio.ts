export const meta = {
  name: "antiaudio",
  alias: ["antiaudio"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antiaudio.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antiaudio* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
