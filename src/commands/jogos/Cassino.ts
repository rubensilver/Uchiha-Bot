export const meta = {
  name: "cassino",
  alias: ["cassino"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Cassino ativado — Clã Uchiha.` });
};
