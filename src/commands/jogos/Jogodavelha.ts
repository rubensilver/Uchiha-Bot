export const meta = {
  name: "jogodavelha",
  alias: ["jogodavelha"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Jogodavelha ativado — Clã Uchiha.` });
};
