import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "desc-gp",
    category: "admin",
    description: "Altera descrição do grupo"
  },

  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    const sender = msg.key?.participant || msg.key?.remoteJid!;
    if (!jid) return;

    if (!jid.endsWith("@g.us")) {
      await sock.sendMessage(jid!, {
        text: `🌑 *Jutsu proibido*

Este comando só funciona em grupos.

👁️ *“O Sharingan não desperta fora do clã.”*`,
        mentions: sender ? [sender] : []
      });
      return;
    }

    if (args.length === 0) {
      await sock.sendMessage(jid!, {
        text: `❌ *Selo incompleto*

Uso correto:
➜ desc-gp <parâmetro>

🩸 *“Até o poder precisa de forma.”*`,
        mentions: sender ? [sender] : []
      });
      return;
    }

    await sock.sendMessage(jid!, {
      text: `🛡️ *Técnica executada*

O comando **desc-gp** foi ativado.

🌑 *“Quem lidera, molda o destino do grupo.”*`,
      mentions: sender ? [sender] : []
    });
  }
};

export default command;