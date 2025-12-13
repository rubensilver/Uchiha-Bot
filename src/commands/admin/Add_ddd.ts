export const meta = {
  name: "add_ddd",
  alias: ["add_ddd"],
  category: "admin",
  description: "Comando Uchiha Supremo: Add_ddd.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Add_ddd* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
