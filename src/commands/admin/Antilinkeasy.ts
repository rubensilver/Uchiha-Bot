export const meta = {
  name: "antilinkeasy",
  alias: ["antilinkeasy"],
  category: "admin",
  description: "Comando Uchiha Supremo: Antilinkeasy.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Antilinkeasy* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
