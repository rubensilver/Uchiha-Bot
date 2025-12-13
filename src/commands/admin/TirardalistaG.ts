export const meta = {
  name: "tirardalistag",
  alias: ["tirardalistag"],
  category: "admin",
  description: "Comando Uchiha Supremo: TirardalistaG.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — TirardalistaG* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
