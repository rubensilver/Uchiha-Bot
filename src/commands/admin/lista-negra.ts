import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "lista-negra",
    category: "admin",
    description: "Adicionar à lista negra"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `❌ Número ausente.
Use: lista-negra <numero>`
      });
    }

    // lógica lista-negra

    await sock.sendMessage(jid!, {
      text: `⚫ Número selado.
👁️ A sombra cresce.`
    });
  }
};

export default command;
