export const meta = {
  name: "eununca",
  alias: ["eununca"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Eununca ativado — Clã Uchiha.` });
};
