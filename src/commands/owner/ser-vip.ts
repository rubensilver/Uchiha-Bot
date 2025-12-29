
import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "ser-vip",
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
➜ ser-vip <parâmetros>

🩸 “O poder exige precisão.”`
      });
      return;
    }

    await sock.sendMessage(jid, {
      text: `💎 *Ritual executado*

O comando **ser-vip** foi ativado.

🔥 “O poder, quando controlado, sustenta o império.”`
    });
  }
};

export default command;
