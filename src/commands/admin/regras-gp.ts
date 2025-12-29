import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "regras-gp",
    category: "admin",
    description: "Mostrar regras do grupo"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (false) {
      return sock.sendMessage(jid!, {
        text: ``
      });
    }

    // lógica regras-gp

    await sock.sendMessage(jid!, {
      text: `📜 Regras do clã apresentadas.`
    });
  }
};

export default command;
