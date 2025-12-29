
import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "reviver",
    category: "admin",
    description: "Reviver mensagem apagada"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `🌑 *Jutsu incompleto*

Uso correto:
➜ reviver <parâmetros>

🩸 *“Até o Sharingan exige precisão.”*`
      });
    }

    await sock.sendMessage(jid!, {
      text: `🔥 *Técnica executada: reviver*

O comando foi aceito pelo clã.

👁️ *“A ordem foi cumprida sem hesitação.”*`
    });
  }
};

export default command;
