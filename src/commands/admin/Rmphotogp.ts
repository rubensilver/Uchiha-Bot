export const meta = {
  name: "rmphotogp",
  alias: ["rmphotogp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Rmphotogp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Rmphotogp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
