export const meta = {
  name: "desafio",
  alias: ["desafio"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo desafio ativado — Clã Uchiha.` });
};
