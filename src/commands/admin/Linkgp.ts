export const meta = {
  name: "linkgp",
  alias: ["linkgp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Linkgp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Linkgp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
