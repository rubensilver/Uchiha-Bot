export const meta = {
  name: "nomegp",
  alias: ["nomegp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Nomegp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Nomegp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
