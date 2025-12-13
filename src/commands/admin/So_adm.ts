export const meta = {
  name: "so_adm",
  alias: ["so_adm"],
  category: "admin",
  description: "Comando Uchiha Supremo: So_adm.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — So_adm* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
