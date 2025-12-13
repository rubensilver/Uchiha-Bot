export const meta = {
  name: "x9visuunica",
  alias: ["x9visuunica"],
  category: "admin",
  description: "Comando Uchiha Supremo: x9visuunica.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — x9visuunica* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
