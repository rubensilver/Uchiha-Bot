
import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "ban",
    category: "admin",
    description: "Banir usuário respondendo a mensagem"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `🌑 *Jutsu incompleto*

Uso correto:
➜ ban <parâmetros>

🩸 *“Até o Sharingan exige precisão.”*`
      });
    }

    await sock.sendMessage(jid!, {
      text: `🔥 *Técnica executada: ban*

O comando foi aceito pelo clã.

👁️ *“A ordem foi cumprida sem hesitação.”*`
    });
  }
};

export default command;
