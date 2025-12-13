export const meta = {
  name: "agenda_futebol",
  alias: ["agenda_futebol"],
  category: "jogos",
  description: "Comando de jogo — Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;
  await sock.sendMessage(jid, { text: `⚔️ Jogo Agenda_Futebol ativado — Clã Uchiha.` });
};
