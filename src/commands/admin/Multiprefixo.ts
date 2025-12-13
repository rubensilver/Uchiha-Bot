export const meta = {
  name: "multiprefixo",
  alias: ["multiprefixo"],
  category: "admin",
  description: "Comando Uchiha Supremo: Multiprefixo.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Multiprefixo* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
