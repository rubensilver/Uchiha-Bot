import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "anti-linkhard",
    category: "admin",
    description: "Sistema anti-linkhard do Clã Uchiha"
  },

  async run({ sock, msg, args }) {
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    const sender = msg.key?.participant || msg.key?.remoteJid!;

    if (!args[0] || !["on","off"].includes(args[0])) {
      return sock.sendMessage(jid!, {
        text: `🌑 *Jutsu incompleto*

Uso correto:
➜ anti-linkhard on
➜ anti-linkhard off

🩸 *“Um selo mal formado consome o próprio usuário.”*`,
        mentions: sender ? [sender] : []
      });
    }

    const estado = args[0] === "on";

    await sock.sendMessage(jid!, {
      text: estado
        ? `🔒 *ANTI-LINKHARD ATIVADO*

👁️ *“O Sharingan vigia até o invisível.”*`
        : `🔓 *ANTI-LINKHARD DESATIVADO*

🌑 *“Nem toda ameaça precisa ser caçada.”*`,
      mentions: sender ? [sender] : []
    });
  }
};

export default command;
