export const meta = {
  name: "limitecomandos",
  alias: ["limitecomandos"],
  category: "admin",
  description: "Comando Uchiha Supremo: Limitecomandos.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Limitecomandos* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
