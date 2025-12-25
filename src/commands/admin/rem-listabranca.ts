import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "rem-listabranca",
    category: "admin",
    description: "Remover da lista branca"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `⚪ Número ausente.`
      });
    }

    // lógica rem-listabranca

    await sock.sendMessage(jid!, {
      text: `⚪ Número removido.`
    });
  }
};

export default command;
