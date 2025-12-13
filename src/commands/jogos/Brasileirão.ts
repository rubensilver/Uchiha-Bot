export const meta = {
  name: "brasileirão",
  alias: ["brasileirão"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Brasileirão ativado — Clã Uchiha.` });
};
