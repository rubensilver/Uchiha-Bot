export const meta = {
  name: "resetforca",
  alias: ["resetforca"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Resetforca ativado — Clã Uchiha.` });
};
