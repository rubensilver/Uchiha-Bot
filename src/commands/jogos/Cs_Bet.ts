export const meta = {
  name: "cs_bet",
  alias: ["cs_bet"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Cs_Bet ativado — Clã Uchiha.` });
};
