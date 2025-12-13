export const meta = {
  name: "antistatus",
  alias: ["antistatus"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antistatus.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antistatus* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
