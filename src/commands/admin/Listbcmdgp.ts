export const meta = {
  name: "listbcmdgp",
  alias: ["listbcmdgp"],
  category: "admin",
  description: "Comando Uchiha Supremo: Listbcmdgp.",
};

export const run = async (sock, m, args) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: `🔥 *Clã Uchiha — Listbcmdgp* 🔥\n\n🩸 O poder do comando foi invocado.`
  });
};
