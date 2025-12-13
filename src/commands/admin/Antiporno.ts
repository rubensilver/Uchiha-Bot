export const meta = {
  name: "antiporno",
  alias: ["antiporno"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antiporno.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antiporno* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
