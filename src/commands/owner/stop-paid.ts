import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "stop-paid",
    category: "owner",
    description: "Para sistema pago"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    if (args.length === 0) {
      await sock.sendMessage(jid, {
        text: `🌑 *Selo incorreto*

O jutsu foi invocado de forma errada.

📌 Exemplo correto:
➜ stop-paid <parâmetro>

🧠 *“Até o Mangekyō exige precisão.”*`
      });
      return;
    }

    await sock.sendMessage(jid, {
      text: `🩸 *Jutsu executado*

O comando **stop-paid** foi ativado com sucesso.

🔥 *“Quem domina os selos, dita o destino.”*`
    });
  }
};

export default command;
