import { Command } from '../../types/Command';

const command: Command = {
  meta: {
    name: 'sistema',
    category: 'bot',
    description: 'Comando do sistema Uchiha'
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    await sock.sendMessage(jid!, {
      text: `🔥 『Uchiha』 O comando *sistema* foi invocado corretamente.`
    });
  }
};

export default command;
