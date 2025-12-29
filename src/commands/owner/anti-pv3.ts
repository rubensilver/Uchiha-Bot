import { Command } from "../../types/Command.js";

let antiPv3Status = false;  // Variável para controlar o estado do anti-pv3

const command: Command = {
  meta: {
    name: "anti-pv3",
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
➜ anti-pv3 <ativar|desativar>

👁️ *“Um Uchiha nunca ativa um jutsu sem propósito.”*`
      });
      return;
    }

    const action = args[0].toLowerCase();

    if (action === "on") {
      if (antiPv3Status) {
        await sock.sendMessage(jid, {
          text: `🩸 *Jutsu já ativado*

O comando **anti-pv3** já está ativo.

🔥 *“O controle já foi estabelecido, nada pode passar.”*`
        });
      } else {
        antiPv3Status = true;
        await sock.sendMessage(jid, {
          text: `🩸 *Jutsu ativado*

A proteção **anti-pv3** foi ativada com sucesso.

🔥 *“A vigilância começa, o clã permanece em segurança.”*`
        });
      }
    } else if (action === "off") {
      if (!antiPv3Status) {
        await sock.sendMessage(jid, {
          text: `🩸 *Jutsu já desativado*

O comando **anti-pv3** já está desativado.

🔥 *“O controle foi retirado, o clã perde sua vigilância.”*`
        });
      } else {
        antiPv3Status = false;
        await sock.sendMessage(jid, {
          text: `🩸 *Jutsu desativado*

A proteção **anti-pv3** foi desativada.

🔥 *“A vigilância se foi, o clã está vulnerável.”*`
        });
      }
    } else {
      await sock.sendMessage(jid, {
        text: `🌑 *Selo incorreto*

O parâmetro fornecido é inválido.

📌 Forma correta:
➜ anti-pv3 on
➜ anti-pv3 off

👁️ *“O que é feito sem intenção está condenado.”*`
      });
    }
  }
};

export default command;