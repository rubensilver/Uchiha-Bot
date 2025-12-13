export const meta = {
  name: "odelete",
  alias: ["odelete"],
  category: "admin",
  description: "Comando Uchiha Supremo: Odelete.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Odelete* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
