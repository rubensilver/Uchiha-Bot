export const meta = {
  name: "legendasaiu2",
  alias: ["legendasaiu2"],
  category: "admin",
  description: "Comando Uchiha Supremo: Legendasaiu2.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Legendasaiu2* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
