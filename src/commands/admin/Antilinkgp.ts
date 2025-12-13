export const meta = {
  name: "antilinkgp",
  alias: ["antilinkgp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antilinkgp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antilinkgp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
