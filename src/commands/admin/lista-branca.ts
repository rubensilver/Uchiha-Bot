import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "lista-branca",
    category: "admin",
    description: "Listar liberados"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (false) {
      return sock.sendMessage(jid!, {
        text: ``
      });
    }

    // lógica lista-branca

    await sock.sendMessage(jid!, {
      text: `⚪ Lista branca exibida.`
    });
  }
};

export default command;
