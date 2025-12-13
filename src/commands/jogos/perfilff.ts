export const meta = {
  name: "perfilff",
  alias: ["perfilff"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo perfilff ativado — Clã Uchiha.` });
};
