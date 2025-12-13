export const meta = {
  name: "regras",
  alias: ["regras"],
  category: "admin",
  description: "Comando Uchiha Supremo: Regras.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Regras* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
