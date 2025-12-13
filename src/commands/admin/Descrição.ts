export const meta = {
  name: "descrição",
  alias: ["descrição"],
  category: "admin",
  description: "Comando Uchiha Supremo: Descrição.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Descrição* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
