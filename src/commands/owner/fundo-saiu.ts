import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "fundo-saiu",
    category: "owner",
    description: "Define fundo de saída"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid, {
        text: `🌑 *Selo incompleto*

O comando foi invocado sem forma.

📌 Exemplo correto:
➜ fundo-saiu <arquivo>

🩸 *“Sem controle, o poder se dissipa.”*`
      });
    }

    await sock.sendMessage(jid, {
      text: `🎞️ *Mídia registrada*

O pergaminho visual foi alterado com sucesso.

👁️ *“A visão molda a realidade.”*`
    });
  }
};

export default command;
