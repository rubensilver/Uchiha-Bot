import { setLegendas } from "../../storage/legendasStore";

import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "legenda-img",
    category: "admin",
    description: "Configuração de legenda - Clã Uchiha"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `🌑 *Jutsu incompleto*

O selo foi ativado sem palavras.

📌 Exemplo correto:
➜ legenda-img texto aqui

✍🏽 *“Até o Sharingan precisa de forma para agir.”*`
      });
    }

    const texto = args.join(" ");
    setLegendas(jid, { legendaimg: texto });

    await sock.sendMessage(jid!, {
      text: `🩸 *Selo gravado com sucesso*

A palavra foi marcada no pergaminho do clã.

✍🏽 *“Quem controla as palavras, controla o ritual.”*`
    });
  }
};

export default command;
