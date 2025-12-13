export const meta = {
  name: "rvisu",
  alias: ["rvisu"],
  category: "admin",
  description: "Comando Uchiha Supremo: rvisu.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — rvisu* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
