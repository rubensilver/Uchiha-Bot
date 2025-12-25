
import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "rg-tm",
    category: "owner",
    description: "Comando do clã Uchiha"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    if (args.length === 0) {
      await sock.sendMessage(jid, {
        text: `🌑 *Selo incorreto*
O comando foi invocado de forma errada.

📌 Exemplo correto:
➜ rg-tm <parâmetros>

🩸 *“Até nas sombras, a forma é tudo.”*`
      });
      return;
    }

    await sock.sendMessage(jid, {
      text: `🩸 *Execução Uchiha*
O comando **rg-tm** foi executado com sucesso.

👁️ *“Mesmo na sombra, o Uchiha observa.”*`
    });
  }
};

export default command;
