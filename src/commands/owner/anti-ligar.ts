import { Command, CommandContext } from "../../types/Command.js";
import { AntiLigarState } from "../../state/AntiLigarState.js";

const command: Command = {
  meta: {
    name: "anti-ligar",
    category: "owner",
    description: "Bloqueia ligações recebidas pelo bot"
  },

  async run(ctx: CommandContext) {
    const { sock, msg, args } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    const action = args[0]?.toLowerCase();

    if (!action || !["on", "off"].includes(action)) {
      await sock.sendMessage(jid, {
        text: `🌑 *Selo incorreto*

Forma correta:
➜ anti-ligar on
➜ anti-ligar off

👁️ *“Controle vem antes do poder.”*`
      });
      return;
    }

    AntiLigarState.enabled = action === "on";

    await sock.sendMessage(jid, {
      text: AntiLigarState.enabled
        ? `🛡️ *Barreira ativada*
Ligações serão automaticamente rejeitadas.

🔥 *“O silêncio também é uma arma.”*`
        : `🔓 *Barreira desfeita*
O bot pode receber ligações novamente.

🩸 *“Nem toda defesa precisa permanecer ativa.”*`
    });
  }
};

export default command;