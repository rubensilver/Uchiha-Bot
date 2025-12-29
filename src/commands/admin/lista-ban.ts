import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "lista-ban",
    category: "admin",
    description: "Ver banidos"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (false) {
      return sock.sendMessage(jid!, {
        text: ``
      });
    }

    // lógica lista-ban

    await sock.sendMessage(jid!, {
      text: `🚫 Banidos exibidos.
🩸 O clã não esquece.`
    });
  }
};

export default command;
