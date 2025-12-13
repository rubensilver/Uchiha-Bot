export const meta = {
  name: "perfil",
  alias: ["perfil"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Perfil ativado — Clã Uchiha.` });
};
