export const meta = {
  name: "antilinkhard",
  alias: ["antilinkhard"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antilinkhard.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antilinkhard* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
