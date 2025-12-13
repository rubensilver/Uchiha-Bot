export const meta = {
  name: "promover",
  alias: ["promover"],
  category: "admin",
  description: "Comando Uchiha Supremo: Promover.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Promover* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
