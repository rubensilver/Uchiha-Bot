export const meta = {
  name: "minado",
  alias: ["minado"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Minado ativado — Clã Uchiha.` });
};
