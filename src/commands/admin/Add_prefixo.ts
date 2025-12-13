export const meta = {
  name: "add_prefixo",
  alias: ["add_prefixo"],
  category: "admin",
  description: "Comando Uchiha Supremo: Add_prefixo.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Add_prefixo* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
