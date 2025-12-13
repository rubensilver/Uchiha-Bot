export const meta = {
  name: "unblockcmdgp",
  alias: ["unblockcmdgp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Unblockcmdgp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Unblockcmdgp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
