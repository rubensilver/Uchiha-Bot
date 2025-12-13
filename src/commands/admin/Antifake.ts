export const meta = {
  name: "antifake",
  alias: ["antifake"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antifake.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antifake* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
