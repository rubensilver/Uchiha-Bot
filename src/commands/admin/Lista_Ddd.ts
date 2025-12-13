export const meta = {
  name: "lista_ddd",
  alias: ["lista_ddd"],
  category: "admin",
  description: "Comando Uchiha Supremo: Lista_Ddd.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Lista_Ddd* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
