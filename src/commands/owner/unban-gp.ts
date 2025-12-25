import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "unban-gp",
    category: "owner",
    description: "Remove banimento de grupo"
  },
  async run(ctx) {
    const { sock, msg } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    await sock.sendMessage(jid, {
      text: `♻️ *Grupo restaurado*

🩸 *“Até no clã, há segunda chance.”*`
    });
  }
};

export default command;