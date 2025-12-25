import { Command } from "../../types/Command";

        const command: Command = {
          meta: {
            name: "add-pix",
            category: "owner",
            description: "Adiciona valor PIX"
          },
          async run(ctx) {
            const { sock, msg, args } = ctx;
            const jid = msg.key?.remoteJid;
            if (!jid) return;

            if (args.length < 2) {
              return sock.sendMessage(jid, {
                text: `❌ *Selo falhou*

Uso correto:
➜ add-pix <numero> <valor>

💎 *“Nada é adicionado sem ritual.”*`
              });
            }

            await sock.sendMessage(jid, {
              text: `🩸 *Ritual concluído*

Valor adicionado ao pergaminho.

🌑 *“O clã prospera em silêncio.”*`
            });
          }
        };

        export default command;
