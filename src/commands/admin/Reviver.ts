export const meta = {
  name: "reviver",
  alias: ["reviver"],
  category: "admin",
  description: "Comando Uchiha Supremo: Reviver.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Reviver* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
