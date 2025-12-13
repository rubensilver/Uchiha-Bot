export const meta = {
  name: "duelo",
  alias: ["duelo"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Duelo ativado — Clã Uchiha.` });
};
