export const meta = {
  name: "resetaki",
  alias: ["resetaki"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Resetaki ativado — Clã Uchiha.` });
};
