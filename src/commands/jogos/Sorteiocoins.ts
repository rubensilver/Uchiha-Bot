export const meta = {
  name: "sorteiocoins",
  alias: ["sorteiocoins"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Sorteiocoins ativado — Clã Uchiha.` });
};
