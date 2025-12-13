export const meta = {
  name: "antisticker",
  alias: ["antisticker"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antisticker.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antisticker* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
