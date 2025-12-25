import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "add-level",
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
➜ add-level <parâmetro>

🔥 *“O poder sem controle leva à ruína.”*`
      });
    }

    await sock.sendMessage(jid, {
      text: `⚜️ *Técnica ativada*

O comando **add-level** foi executado.

🌑 *“Somente quem domina o crescimento, domina o futuro.”*`
    });
  }
};

export default command;
