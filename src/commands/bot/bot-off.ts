import { Command } from '../../types/Command.js';

const command: Command = {
  meta: {
    name: 'bot-off',
    category: 'bot',
    description: 'Comando do sistema Uchiha'
  },
  async run(ctx) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid!;
    if (!jid) return;

    await sock.sendMessage(jid!, {
      text: `🔥 『Uchiha』 O comando *bot-off* foi invocado corretamente.`
    });
  }
};

export default command;
