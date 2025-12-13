export const meta = {
  name: "legendabv",
  alias: ["legendabv"],
  category: "admin",
  description: "Comando Uchiha Supremo: Legendabv.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Legendabv* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
