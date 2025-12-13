export const meta = {
  name: "prox_jogos",
  alias: ["prox_jogos"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Prox_Jogos ativado — Clã Uchiha.` });
};
