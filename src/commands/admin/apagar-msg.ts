
import { Command } from '../../types/Command.js';

const command: Command = {
  meta: {
    name: 'apagar-msg',
    category: 'adm-sistemas',
    description: 'Sistema do Clã Uchiha'
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    if (args.length === 0) {
      await sock.sendMessage(jid!, {
        text: '👁️‍🗨️ O Sharingan exige precisão.\nExemplo correto: *apagar-msg on*'
      });
      return;
    }

    await sock.sendMessage(jid!, {
      text: '⚙️ 『O Clã Uchiha ajustou o sistema *apagar-msg* conforme sua vontade.』'
    });
  }
};

export default command;
