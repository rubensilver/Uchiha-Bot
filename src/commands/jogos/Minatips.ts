export const meta = {
  name: "minatips",
  alias: ["minatips"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Minatips ativado — Clã Uchiha.` });
};
