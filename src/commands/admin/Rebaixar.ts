export const meta = {
  name: "rebaixar",
  alias: ["rebaixar"],
  category: "admin",
  description: "Comando Uchiha Supremo: Rebaixar.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Rebaixar* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
