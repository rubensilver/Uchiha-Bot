
import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "list-premium",
    category: "owner",
    description: "Comando premium do Clã Uchiha"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    if (args.length === 0) {
      await sock.sendMessage(jid, {
        text: `🌑 *Selo incompleto*

Uso correto:
➜ list-premium <parâmetros>

🩸 “O poder exige precisão.”`
      });
      return;
    }

    await sock.sendMessage(jid, {
      text: `💎 *Ritual executado*

O comando **list-premium** foi ativado.

🔥 “O poder, quando controlado, sustenta o império.”`
    });
  }
};

export default command;
