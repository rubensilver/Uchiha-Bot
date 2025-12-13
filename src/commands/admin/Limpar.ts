export const meta = {
  name: "limpar",
  alias: ["limpar"],
  category: "admin",
  description: "Comando Uchiha Supremo: Limpar.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Limpar* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
