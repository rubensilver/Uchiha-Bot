import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "set-prefixo",
    category: "admin",
    description: "Define prefixo principal"
  },

  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (!args[0]) {
      return sock.sendMessage(jid!, {
        text: `🌑 *Jutsu incompleto*

O comando foi conjurado de forma incorreta.

📌 Exemplo correto:
➜ *set-prefixo argumento*

🩸 *“Um selo mal traçado destrói o ritual.”*`
      });
    }

    await sock.sendMessage(jid!, {
      text: `👁️ *Configuração aplicada*

O comando *set-prefixo* foi executado com sucesso.

🌒 *“Quem domina as regras, molda a realidade.”*`
    });
  }
};

export default command;
