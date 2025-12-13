export const meta = {
  name: "antivideo",
  alias: ["antivideo"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antivideo.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antivideo* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
