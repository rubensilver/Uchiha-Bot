import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "priv-photobot",
    category: "owner",
    description: "Técnica do Clã Uchiha"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    if (args.length === 0) {
      await sock.sendMessage(jid, {
        text: `🌑 *Selo incorreto*

O jutsu foi invocado de forma errada.

📌 Forma correta:
➜ priv-photobot <parâmetro>

👁️ *“Um Uchiha nunca ativa um jutsu sem propósito.”*`
      });
      return;
    }

    await sock.sendMessage(jid, {
      text: `🩸 *Jutsu executado*

O comando **priv-photobot** foi ativado.

🔥 *“O controle é a primeira linha de defesa do clã.”*`
    });
  }
};

export default command;
