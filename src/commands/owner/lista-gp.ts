import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "lista-gp",
    category: "owner",
    description: "Lista grupos"
  },
  async run(ctx) {
    const { sock, msg } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    await sock.sendMessage(jid, {
      text: `📜 *Pergaminho de Grupos*

— Lista carregada —

👥 *“Conhecer o clã é conhecer o poder.”*`
    });
  }
};

export default command;