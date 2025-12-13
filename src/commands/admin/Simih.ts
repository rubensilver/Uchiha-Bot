export const meta = {
  name: "simih",
  alias: ["simih"],
  category: "admin",
  description: "Comando Uchiha Supremo: Simih.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Simih* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
