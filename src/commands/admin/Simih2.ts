export const meta = {
  name: "simih2",
  alias: ["simih2"],
  category: "admin",
  description: "Comando Uchiha Supremo: Simih2.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Simih2* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
