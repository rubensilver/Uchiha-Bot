export const meta = {
  name: "tempocmd",
  alias: ["tempocmd"],
  category: "admin",
  description: "Comando Uchiha Supremo: Tempocmd.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Tempocmd* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
