export const meta = {
  name: "anticontato",
  alias: ["anticontato"],
  category: "admin",
  description: "Comando Uchiha Supremo: Anticontato.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Anticontato* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
