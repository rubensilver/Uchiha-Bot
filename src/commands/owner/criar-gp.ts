import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "criar-gp",
    category: "owner",
    description: "Cria um grupo"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    if (!args.length) {
      return sock.sendMessage(jid, {
        text: `❌ *Nome ausente*

Uso correto:
➜ criar-gp Nome do grupo

🔥 *“Todo clã nasce de um nome.”*`
      });
    }

    await sock.sendMessage(jid, {
      text: `🏴‍☠️ *Grupo criado*

Nome: ${args.join(" ")}

🌑 *“Um novo território foi marcado.”*`
    });
  }
};

export default command;