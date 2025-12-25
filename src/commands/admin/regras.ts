import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "regras",
    category: "admin",
    description: "Definir regras"
  },
  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      return sock.sendMessage(jid!, {
        text: `📜 Nenhuma regra dita.
Use: regras <texto>
🌑 Palavras moldam destinos.`
      });
    }

    // lógica regras aqui

    await sock.sendMessage(jid!, {
      text: `📜 Regras gravadas.
🩸 Ordem mantida.`
    });
  }
};

export default command;
