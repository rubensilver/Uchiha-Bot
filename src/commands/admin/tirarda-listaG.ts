import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "tirarda-listaG",
    category: "admin",
    description: "Remover da lista global"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `❌ Número ausente.`
      });
    }

    // lógica tirarda-listaG

    await sock.sendMessage(jid!, {
      text: `🗑️ Número global removido.`
    });
  }
};

export default command;
