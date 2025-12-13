export const meta = {
  name: "descgp",
  alias: ["descgp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Descgp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Descgp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
