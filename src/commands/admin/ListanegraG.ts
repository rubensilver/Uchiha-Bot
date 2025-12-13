export const meta = {
  name: "listanegrag",
  alias: ["listanegrag"],
  category: "admin",
  description: "Comando Uchiha Supremo: ListanegraG.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — ListanegraG* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
