export const meta = {
  name: "meme",
  alias: ["meme"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo meme ativado — Clã Uchiha.` });
};
