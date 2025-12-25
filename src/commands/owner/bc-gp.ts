import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "bc-gp",
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
➜ bc-gp <parâmetro>

👁️ *“Um Uchiha nunca ativa um jutsu sem propósito.”*`
      });
      return;
    }

    await sock.sendMessage(jid, {
      text: `🩸 *Jutsu executado*

O comando **bc-gp** foi ativado.

🔥 *“O controle é a primeira linha de defesa do clã.”*`
    });
  }
};

export default command;
