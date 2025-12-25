
import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "verificado-global",
    category: "owner",
    description: "Comando do Clã Uchiha"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid, {
        text: `🌑 *Selo incompleto*

Uso correto:
➜ verificado-global <parâmetros>

🩸 *“O poder sem forma consome o portador.”*`
      });
    }

    await sock.sendMessage(jid, {
      text: `🔥 *Técnica executada*

O comando **verificado-global** respondeu ao chamado.

👁️ *“A vontade do Clã jamais falha.”*`
    });
  }
};

export default command;
