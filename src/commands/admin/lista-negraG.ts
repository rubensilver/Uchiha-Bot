import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "lista-negraG",
    category: "admin",
    description: "Lista negra global"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `❌ Número ausente.`
      });
    }

    // lógica lista-negraG

    await sock.sendMessage(jid!, {
      text: `⚫ Número banido globalmente.`
    });
  }
};

export default command;
