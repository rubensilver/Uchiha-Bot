export const meta = {
  name: "blockcmdgp",
  alias: ["blockcmdgp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Blockcmdgp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Blockcmdgp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
