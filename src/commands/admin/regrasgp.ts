export const meta = {
  name: "regrasgp",
  alias: ["regrasgp"],
  category: "admin",
  description: "Comando Uchiha Supremo: regrasgp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — regrasgp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
