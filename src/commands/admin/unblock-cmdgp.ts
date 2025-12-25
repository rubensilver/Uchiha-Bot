import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "unblock-cmdgp",
    category: "admin",
    description: "Desbloquear comando"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `🔓 Nome do comando ausente.`
      });
    }

    // lógica unblock-cmdgp

    await sock.sendMessage(jid!, {
      text: `🔓 Comando liberado.`
    });
  }
};

export default command;
