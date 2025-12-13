export const meta = {
  name: "modonsfw",
  alias: ["modonsfw"],
  category: "admin",
  description: "Comando Uchiha Supremo: Modonsfw.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Modonsfw* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
