import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "modo-nsfw",
    category: "admin",
    description: "Ativa ou desativa modo NSFW"
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
➜ *modo-nsfw argumento*

🩸 *“Um selo mal traçado destrói o ritual.”*`
      });
    }

    await sock.sendMessage(jid!, {
      text: `👁️ *Configuração aplicada*

O comando *modo-nsfw* foi executado com sucesso.

🌒 *“Quem domina as regras, molda a realidade.”*`
    });
  }
};

export default command;
