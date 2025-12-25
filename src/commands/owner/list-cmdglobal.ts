import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "list-cmdglobal",
    category: "owner",
    description: "Lista comandos globais"
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
➜ list-cmdglobal <parâmetro>

🧠 *“Até o Mangekyō exige precisão.”*`
      });
      return;
    }

    await sock.sendMessage(jid, {
      text: `🩸 *Jutsu executado*

O comando **list-cmdglobal** foi ativado com sucesso.

🔥 *“Quem domina os selos, dita o destino.”*`
    });
  }
};

export default command;
