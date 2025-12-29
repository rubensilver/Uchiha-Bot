import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "add-ddd",
    category: "admin",
    description: "Adicionar DDD"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `📵 DDD ausente.
Use: add-ddd <+55>
👁️ Nada entra sem permissão.`
      });
    }

    // lógica add-ddd aqui

    await sock.sendMessage(jid!, {
      text: `📵 DDD permitido.
🌑 O clã decide quem entra.`
    });
  }
};

export default command;
