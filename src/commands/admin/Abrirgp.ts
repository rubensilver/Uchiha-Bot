export const meta = {
  name: "abrirgp",
  alias: ["abrirgp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Abrirgp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Abrirgp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
