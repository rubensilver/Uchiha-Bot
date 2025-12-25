import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "anti-palavrao",
    category: "admin",
    description: "Sistema anti-palavrao do Clã Uchiha"
  },

  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    const sender = msg.key?.participant || msg.key?.remoteJid!;

    if (!args[0] || !["on","off"].includes(args[0])) {
      return sock.sendMessage(jid!, {
        text: `🌑 *Jutsu incompleto*

Uso correto:
➜ anti-palavrao on
➜ anti-palavrao off

🩸 *“Um selo mal formado consome o próprio usuário.”*`,
        mentions: sender ? [sender] : []
      });
    }

    const estado = args[0] === "on";

    await sock.sendMessage(jid!, {
      text: estado
        ? `🔒 *ANTI-PALAVRAO ATIVADO*

👁️ *“O Sharingan vigia até o invisível.”*`
        : `🔓 *ANTI-PALAVRAO DESATIVADO*

🌑 *“Nem toda ameaça precisa ser caçada.”*`,
      mentions: sender ? [sender] : []
    });
  }
};

export default command;
