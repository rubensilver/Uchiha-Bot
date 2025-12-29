import { Command } from "../../types/Command.js";

const command: Command = {
  meta: {
    name: "ban-gp",
    category: "owner",
    description: "Bane um grupo"
  },
  async run(ctx) {
    const { sock, msg } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    await sock.sendMessage(jid, {
      text: `🚫 *Grupo banido*

🌑 *“Onde o clã não aceita, não há abrigo.”*`
    });
  }
};

export default command;