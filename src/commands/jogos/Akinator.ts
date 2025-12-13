export const meta = {
  name: "akinator",
  alias: ["akinator"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Akinator ativado — Clã Uchiha.` });
};
