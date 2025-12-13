export const meta = {
  name: "anagrama",
  alias: ["anagrama"],
  category: "admin",
  description: "Comando Uchiha Supremo: Anagrama.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Anagrama* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
