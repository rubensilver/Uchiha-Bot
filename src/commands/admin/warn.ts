import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "warn",
    category: "admin",
    description: "Gerenciar avisos"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `⚠️ Caminho incorreto.
Use: warn add|del|list
🩸 O erro também ensina.`
      });
    }

    // lógica warn aqui

    await sock.sendMessage(jid!, {
      text: `🛡️ Aviso processado.
👁️ O clã observa.`
    });
  }
};

export default command;
