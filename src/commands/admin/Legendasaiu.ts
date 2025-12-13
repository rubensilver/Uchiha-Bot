export const meta = {
  name: "legendasaiu",
  alias: ["legendasaiu"],
  category: "admin",
  description: "Comando Uchiha Supremo: Legendasaiu.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Legendasaiu* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
