export const meta = {
  name: "x9",
  alias: ["x9"],
  category: "admin",
  description: "Comando Uchiha Supremo: x9.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — x9* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
