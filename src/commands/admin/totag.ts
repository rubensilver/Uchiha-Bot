
import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "totag",
    category: "admin",
    description: "Marcar alguém com mensagem"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `🌑 *Jutsu incompleto*

Uso correto:
➜ totag <parâmetros>

🩸 *“Até o Sharingan exige precisão.”*`
      });
    }

    await sock.sendMessage(jid!, {
      text: `🔥 *Técnica executada: totag*

O comando foi aceito pelo clã.

👁️ *“A ordem foi cumprida sem hesitação.”*`
    });
  }
};

export default command;
