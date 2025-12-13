export const meta = {
  name: "anagrama",
  alias: ["anagrama"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Anagrama ativado — Clã Uchiha.` });
};
