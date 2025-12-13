export const meta = {
  name: "tirar_prefixo",
  alias: ["tirar_prefixo"],
  category: "admin",
  description: "Comando Uchiha Supremo: Tirar_prefixo.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Tirar_prefixo* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
