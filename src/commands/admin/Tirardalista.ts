export const meta = {
  name: "tirardalista",
  alias: ["tirardalista"],
  category: "admin",
  description: "Comando Uchiha Supremo: Tirardalista.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Tirardalista* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
