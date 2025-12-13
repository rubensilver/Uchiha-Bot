export const meta = {
  name: "quizanimais",
  alias: ["quizanimais"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo QuizAnimais ativado — Clã Uchiha.` });
};
