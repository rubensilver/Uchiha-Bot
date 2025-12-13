export const meta = {
  name: "whatmusic",
  alias: ["whatmusic"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Whatmusic ativado — Clã Uchiha.` });
};
