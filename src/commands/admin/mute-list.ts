
import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "mute-list",
    category: "admin",
    description: "Lista de mutados"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `🌑 *Jutsu incompleto*

Uso correto:
➜ mute-list <parâmetros>

🩸 *“Até o Sharingan exige precisão.”*`
      });
    }

    await sock.sendMessage(jid!, {
      text: `🔥 *Técnica executada: mute-list*

O comando foi aceito pelo clã.

👁️ *“A ordem foi cumprida sem hesitação.”*`
    });
  }
};

export default command;
