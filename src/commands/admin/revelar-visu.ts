
import { Command } from '../../types/Command';

const command: Command = {
  meta: {
    name: 'revelar-visu',
    category: 'adm-sistemas',
    description: 'Sistema do Clã Uchiha'
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      await sock.sendMessage(jid!, {
        text: '👁️‍🗨️ O Sharingan exige precisão.\nExemplo correto: *revelar-visu on*'
      });
      return;
    }

    await sock.sendMessage(jid!, {
      text: '⚙️ 『O Clã Uchiha ajustou o sistema *revelar-visu* conforme sua vontade.』'
    });
  }
};

export default command;
