import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "abrir-gp",
    category: "admin",
    description: "Abre o grupo"
  },

  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    const sender = msg.key?.participant || msg.key?.remoteJid!;
    if (!jid) return;

    if (!jid.endsWith("@g.us")) {
      return sock.sendMessage(jid!, {
        text: `🌑 *Jutsu proibido*

Este comando só funciona em grupos.

👁️ *“O Sharingan não desperta fora do clã.”*`,
        mentions: sender ? [sender] : []
      });
    }

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `❌ *Selo incompleto*

Uso correto:
➜ abrir-gp <parâmetro>

🩸 *“Até o poder precisa de forma.”*`,
        mentions: sender ? [sender] : []
      });
    }

    await sock.sendMessage(jid!, {
      text: `🛡️ *Técnica executada*

O comando **abrir-gp** foi ativado.

🌑 *“Quem lidera, molda o destino do grupo.”*`,
      mentions: sender ? [sender] : []
    });
  }
};

export default command;