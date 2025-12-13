export const meta = {
  name: "mineshelp",
  alias: ["mineshelp"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Mineshelp ativado — Clã Uchiha.` });
};
