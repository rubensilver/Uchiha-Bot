export const meta = {
  name: "minerarcoins",
  alias: ["minerarcoins"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo MinerarCoins ativado — Clã Uchiha.` });
};
