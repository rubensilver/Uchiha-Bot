import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "block-levellist",
    category: "owner",
    description: "Controle de XP/Level - Clã Uchiha"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid, {
        text: `❌ *Selo incompleto*

Uso correto:
➜ block-levellist <parâmetro>

🔥 *“O poder sem controle leva à ruína.”*`
      });
    }

    await sock.sendMessage(jid, {
      text: `⚜️ *Técnica ativada*

O comando **block-levellist** foi executado.

🌑 *“Somente quem domina o crescimento, domina o futuro.”*`
    });
  }
};

export default command;
