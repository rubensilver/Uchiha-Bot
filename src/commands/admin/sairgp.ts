export const meta = {
  name: "sairgp",
  alias: ["sairgp"],
  category: "admin",
  description: "Comando Uchiha Supremo: sairgp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — sairgp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
