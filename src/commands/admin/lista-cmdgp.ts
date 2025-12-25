import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "lista-cmdgp",
    category: "admin",
    description: "Listar comandos do grupo"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (false) {
      return sock.sendMessage(jid!, {
        text: ``
      });
    }

    // lógica lista-cmdgp

    await sock.sendMessage(jid!, {
      text: `📜 Comandos revelados.`
    });
  }
};

export default command;
