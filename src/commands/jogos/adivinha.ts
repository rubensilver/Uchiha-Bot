export const meta = {
  name: "adivinha",
  alias: ["adivinha"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo adivinha ativado — Clã Uchiha.` });
};
