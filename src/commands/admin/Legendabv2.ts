export const meta = {
  name: "legendabv2",
  alias: ["legendabv2"],
  category: "admin",
  description: "Comando Uchiha Supremo: Legendabv2.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Legendabv2* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
