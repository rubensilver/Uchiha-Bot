export const meta = {
  name: "r-forca",
  alias: ["r-forca"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo R-forca ativado — Clã Uchiha.` });
};
