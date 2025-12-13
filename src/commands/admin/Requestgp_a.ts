export const meta = {
  name: "requestgp_a",
  alias: ["requestgp_a"],
  category: "admin",
  description: "Comando Uchiha Supremo: Requestgp_a.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Requestgp_a* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
