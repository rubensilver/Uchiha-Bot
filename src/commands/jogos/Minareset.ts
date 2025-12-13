export const meta = {
  name: "minareset",
  alias: ["minareset"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Minareset ativado — Clã Uchiha.` });
};
