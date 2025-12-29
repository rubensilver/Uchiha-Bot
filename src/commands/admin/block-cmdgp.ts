import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "block-cmdgp",
    category: "admin",
    description: "Bloquear comando"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `🚫 Nome do comando ausente.`
      });
    }

    // lógica block-cmdgp

    await sock.sendMessage(jid!, {
      text: `🚫 Comando bloqueado.`
    });
  }
};

export default command;
