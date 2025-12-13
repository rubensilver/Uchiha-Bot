export const meta = {
  name: "autosticker",
  alias: ["autosticker"],
  category: "admin",
  description: "Comando Uchiha Supremo: Autosticker.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Autosticker* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
