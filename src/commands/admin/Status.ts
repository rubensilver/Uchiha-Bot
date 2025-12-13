export const meta = {
  name: "status",
  alias: ["status"],
  category: "admin",
  description: "Comando Uchiha Supremo: Status.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Status* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
