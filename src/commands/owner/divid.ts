import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "divid",
    category: "owner",
    description: "Divide por ID"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    if (!args[0]) {
      return sock.sendMessage(jid, {
        text: `❌ *ID ausente*

Uso correto:
➜ divid <id>

👁️ *“Sem alvo, não há corte.”*`
      });
    }

    await sock.sendMessage(jid, {
      text: `🩸 *Divisão executada*

ID processado: ${args[0]}

🌑 *“O clã decide quem permanece inteiro.”*`
    });
  }
};

export default command;