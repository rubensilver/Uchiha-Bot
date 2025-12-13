export const meta = {
  name: "estatisticas",
  alias: ["estatisticas"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Estatisticas ativado — Clã Uchiha.` });
};
