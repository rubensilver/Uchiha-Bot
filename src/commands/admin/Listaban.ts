export const meta = {
  name: "listaban",
  alias: ["listaban"],
  category: "admin",
  description: "Comando Uchiha Supremo: Listaban.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Listaban* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
