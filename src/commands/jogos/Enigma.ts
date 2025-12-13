export const meta = {
  name: "enigma",
  alias: ["enigma"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Enigma ativado — Clã Uchiha.` });
};
