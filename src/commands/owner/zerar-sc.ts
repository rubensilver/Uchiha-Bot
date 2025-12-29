import { Command } from "../../types/Command.js";

        const command: Command = {
          meta: {
            name: "zerar-sc",
            category: "owner",
            description: "Zera saldo de conta"
          },
          async run(ctx) {
            const { sock, msg, args } = ctx;
            const jid = msg.key?.remoteJid;
            if (!jid) return;

            if (args.length < 1) {
              return sock.sendMessage(jid, {
                text: `❌ *Selo incompleto*

Uso correto:
➜ zerar-sc <numero>

🌑 *“Às vezes, o zero é o renascimento.”*`
              });
            }

            await sock.sendMessage(jid, {
              text: `🔥 *Conta purificada*

Saldo zerado.

🌑 *“Do vazio nasce um novo poder.”*`
            });
          }
        };

        export default command;
