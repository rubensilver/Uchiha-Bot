import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "tirarda-lista",
    category: "admin",
    description: "Remover da lista"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `❌ Número ausente.`
      });
    }

    // lógica tirarda-lista

    await sock.sendMessage(jid!, {
      text: `🗑️ Número removido.`
    });
  }
};

export default command;
