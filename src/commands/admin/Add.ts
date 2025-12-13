export const meta = {
  name: "add",
  alias: ["add"],
  category: "admin",
  description: "Comando Uchiha Supremo: Add.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Add* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
