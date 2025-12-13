export const meta = {
  name: "legenda_imagem",
  alias: ["legenda_imagem"],
  category: "admin",
  description: "Comando Uchiha Supremo: Legenda_imagem.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Legenda_imagem* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
