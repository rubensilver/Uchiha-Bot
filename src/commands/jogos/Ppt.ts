export const meta = {
  name: "ppt",
  alias: ["ppt"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Ppt ativado — Clã Uchiha.` });
};
