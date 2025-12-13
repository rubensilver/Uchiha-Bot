export const meta = {
  name: "limitec_global",
  alias: ["limitec_global"],
  category: "admin",
  description: "Comando Uchiha Supremo: Limitec_Global.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Limitec_Global* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
