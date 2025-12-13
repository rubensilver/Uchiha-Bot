export const meta = {
  name: "ultimos_jogos",
  alias: ["ultimos_jogos"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Ultimos_Jogos ativado — Clã Uchiha.` });
};
