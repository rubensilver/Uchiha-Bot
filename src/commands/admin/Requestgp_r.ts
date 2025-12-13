export const meta = {
  name: "requestgp_r",
  alias: ["requestgp_r"],
  category: "admin",
  description: "Comando Uchiha Supremo: Requestgp_r.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Requestgp_r* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
