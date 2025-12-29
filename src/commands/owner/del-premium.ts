
import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "del-premium",
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
➜ del-premium <parâmetros>

🩸 “O poder exige precisão.”`
      });
      return;
    }

    await sock.sendMessage(jid, {
      text: `💎 *Ritual executado*

O comando **del-premium** foi ativado.

🔥 “O poder, quando controlado, sustenta o império.”`
    });
  }
};

export default command;
