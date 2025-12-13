export const meta = {
  name: "revlinkgp",
  alias: ["revlinkgp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Revlinkgp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Revlinkgp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
