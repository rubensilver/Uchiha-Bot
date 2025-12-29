import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "add",
    category: "admin",
    description: "Adicionar número à lista"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `🩸 *Jutsu incompleto*
Use: add <numero>
👁️ O clã não age sem alvo.`
      });
    }

    // lógica add aqui

    await sock.sendMessage(jid!, {
      text: `📃 Número selado na lista.
🌑 O controle começa pelos detalhes.`
    });
  }
};

export default command;
