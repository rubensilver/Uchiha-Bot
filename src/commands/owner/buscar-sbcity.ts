import { Command } from "../../types/Command";

        const command: Command = {
          meta: {
            name: "buscar-sbcity",
            category: "owner",
            description: "Busca saldo por menção"
          },
          async run(ctx) {
            const { sock, msg, args } = ctx;
            const jid = msg.key?.remoteJid;
            if (!jid) return;

            if (args.length < 1) {
              return sock.sendMessage(jid, {
                text: `❌ *Olhos fechados*

Uso correto:
➜ buscar-sbcity @usuario

👁️ *“O Sharingan precisa de um alvo.”*`
              });
            }

            await sock.sendMessage(jid, {
              text: `🔮 *Visão revelada*

Saldo localizado.

🌑 *“Nada se esconde do olhar do clã.”*`
            });
          }
        };

        export default command;
