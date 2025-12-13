export const meta = {
  name: "requestgp_list",
  alias: ["requestgp_list"],
  category: "admin",
  description: "Comando Uchiha Supremo: Requestgp_list.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Requestgp_list* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
