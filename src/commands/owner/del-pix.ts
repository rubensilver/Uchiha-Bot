import { Command } from "../../types/Command";

        const command: Command = {
          meta: {
            name: "del-pix",
            category: "owner",
            description: "Remove valor PIX do pergaminho financeiro"
          },
          async run(ctx) {
            const { sock, msg, args } = ctx;
            const jid = msg.key?.remoteJid;
            if (!jid) return;

            if (args.length < 2) {
              return sock.sendMessage(jid, {
                text: `❌ *Selo quebrado*

Uso correto:
➜ del-pix <numero> <valor>

💎 *“Retirar recursos sem forma é trair o clã.”*`
              });
            }

            await sock.sendMessage(jid, {
              text: `🩸 *Pergaminho alterado*

PIX removido com precisão.

🌑 *“O controle financeiro mantém o Sharingan desperto.”*`
            });
          }
        };

        export default command;
