export const meta = {
  name: "grupoinfo",
  alias: ["grupoinfo"],
  category: "admin",
  description: "Comando Uchiha Supremo: Grupoinfo.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Grupoinfo* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
