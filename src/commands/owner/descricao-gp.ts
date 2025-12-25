import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "descricao-gp",
    category: "owner",
    description: "Define descrição do grupo"
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    if (!args.length) {
      return sock.sendMessage(jid, {
        text: `❌ *Texto ausente*

Uso correto:
➜ descricao-gp texto

🩸 *“Sem palavras, não há identidade.”*`
      });
    }

    await sock.sendMessage(jid, {
      text: `📝 *Descrição selada*

${args.join(" ")}

👁️ *“O clã agora tem voz.”*`
    });
  }
};

export default command;