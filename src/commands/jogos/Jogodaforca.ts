export const meta = {
  name: "jogodaforca",
  alias: ["jogodaforca"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Jogodaforca ativado — Clã Uchiha.` });
};
