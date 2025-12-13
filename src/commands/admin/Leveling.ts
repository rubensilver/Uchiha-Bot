export const meta = {
  name: "leveling",
  alias: ["leveling"],
  category: "admin",
  description: "Comando Uchiha Supremo: Leveling.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Leveling* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
