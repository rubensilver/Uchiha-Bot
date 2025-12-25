import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "add-listabranca",
    category: "admin",
    description: "Adicionar à lista branca"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `⚪ Número ausente.`
      });
    }

    // lógica add-listabranca

    await sock.sendMessage(jid!, {
      text: `⚪ Número liberado.`
    });
  }
};

export default command;
