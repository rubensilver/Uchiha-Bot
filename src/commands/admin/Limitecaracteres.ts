export const meta = {
  name: "limitecaracteres",
  alias: ["limitecaracteres"],
  category: "admin",
  description: "Comando Uchiha Supremo: Limitecaracteres.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Limitecaracteres* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
