import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "fundo-welcome",
    category: "owner",
    description: "Define fundo de boas-vindas"
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
➜ fundo-welcome <arquivo>

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
