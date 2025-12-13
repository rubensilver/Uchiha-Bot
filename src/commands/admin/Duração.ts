export const meta = {
  name: "duração",
  alias: ["duração"],
  category: "admin",
  description: "Comando Uchiha Supremo: Duração.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Duração* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
