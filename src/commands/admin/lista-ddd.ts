import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "lista-ddd",
    category: "admin",
    description: "Listar DDDs"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (false) {
      return sock.sendMessage(jid!, {
        text: ``
      });
    }

    // lógica listar ddd

    await sock.sendMessage(jid!, {
      text: `📃 Lista de DDDs revelada.
🌑 Conhecimento é poder.`
    });
  }
};

export default command;
