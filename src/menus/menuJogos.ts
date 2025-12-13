export const meta = {
  name: "menujogos",
  alias: ["menu-jogos", "jogos", "games"],
  category: "menus",
  description: "Menu dos Jogos — Tema Uchiha.",
};

export const run = async (sock, m, prefix) => {
  const jid = m.key.remoteJid;

  const text = `
🔥⌬ *CLÃ UCHIHA — MENU DOS JOGOS* ⌬🔥
══════════════════════════════

🌑 *\"A escuridão revela apenas os verdadeiros jogadores do destino...\"*

〔 𝙼𝙴𝙽𝚄-𝙹𝙾𝙶𝙾𝚂 〕
│╭┬━─━─━─━─━─━─━─𔓕
│┊├🔷${prefix}Jogodavelha (@)
│┊├🔷${prefix}Eununca
│┊├🔷${prefix}Ppt
│┊├🔷${prefix}Duelo
│┊├🔷${prefix}Cassino
│┊├🔷${prefix}Estatisticas
│┊├🔷${prefix}Sorteiocoins
│┊├🔷${prefix}MinerarCoins
│┊├🔷${prefix}Cs_Bet
│┊├🔷${prefix}Anagrama
│┊├🔷${prefix}Gartic
│┊├🔷${prefix}Enigma
│┊├🔷${prefix}QuizAnimais
│┊├🔷${prefix}Brasileirão
│┊├🔷${prefix}Agenda_Futebol
│┊├🔷${prefix}Placares
│┊├🔷${prefix}Ultimos_Jogos
│┊├🔷${prefix}Prox_Jogos
│╰┴━─━─━─━─━─━─━─𔓕

🌕 *\"Somente quem domina os jogos domina o próprio destino — Clã Uchiha.\"*
`;

  await sock.sendMessage(jid, { text });
};
