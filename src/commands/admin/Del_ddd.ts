export const meta = {
  name: "del_ddd",
  alias: ["del_ddd"],
  category: "admin",
  description: "Comando Uchiha Supremo: Del_ddd.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Del_ddd* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
