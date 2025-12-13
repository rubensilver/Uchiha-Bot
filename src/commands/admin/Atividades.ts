export const meta = {
  name: "atividades",
  alias: ["atividades"],
  category: "admin",
  description: "Comando Uchiha Supremo: Atividades.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Atividades* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
