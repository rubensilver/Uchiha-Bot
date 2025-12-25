import { Command } from "../../types/Command";

        const command: Command = {
          meta: {
            name: "set-pix",
            category: "owner",
            description: "Define valor PIX"
          },
          async run(ctx) {
            const { sock, msg, args } = ctx;
            const jid = msg.key?.remoteJid;
            if (!jid) return;

            if (args.length < 2) {
              return sock.sendMessage(jid, {
                text: `❌ *Selo incompleto*

Uso correto:
➜ set-pix <numero> <valor>

💎 *“O poder exige definição clara.”*`
              });
            }

            await sock.sendMessage(jid, {
              text: `🛡️ *Selo financeiro ativado*

PIX configurado.

🌑 *“O império cresce com disciplina.”*`
            });
          }
        };

        export default command;
