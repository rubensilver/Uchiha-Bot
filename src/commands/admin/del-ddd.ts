import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "del-ddd",
    category: "admin",
    description: "Remover DDD"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `📵 DDD não informado.
Use: del-ddd <+55>
🩸 Corte preciso.`
      });
    }

    // lógica del-ddd aqui

    await sock.sendMessage(jid!, {
      text: `📵 DDD removido.
👁️ A barreira se fecha.`
    });
  }
};

export default command;
