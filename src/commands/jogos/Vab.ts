export const meta = {
  name: "vab",
  alias: ["vab"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Vab ativado — Clã Uchiha.` });
};
