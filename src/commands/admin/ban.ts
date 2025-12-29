import { Command } from "../../types/Command";

const command: Command = {
  meta: {
    name: "ban",
    category: "admin",
    description: "Banir usuário (reply ou menção)"
  },

  async run(ctx) {
    const { sock, msg } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    // ✅ só grupo
    if (!jid.endsWith("@g.us")) {
      await sock.sendMessage(jid, {
        text: `❌ Este comando só funciona em grupos.`
      });
      return;
    }

    // 🎯 alvo: reply ou menção
    const context = msg.message?.extendedTextMessage?.contextInfo;

    const rawTarget =
      context?.participant ||
      context?.mentionedJid?.[0];

    if (!rawTarget) {
      await sock.sendMessage(jid, {
        text: `❌ Use respondendo uma mensagem ou mencionando o membro.`
      });
      return;
    }

    // ✅ normaliza JID
    const target =
      rawTarget.split(":")[0] + "@s.whatsapp.net";

    try {
      // ⚔️ EXECUÇÃO REAL
      await sock.groupParticipantsUpdate(
        jid,
        [target],
        "remove"
      );

      await sock.sendMessage(jid, {
        text: `🔥 *BAN EXECUTADO*

O membro foi removido do clã.`,
        mentions: [target]
      });

    } catch (err) {
      await sock.sendMessage(jid, {
        text: `❌ Falha ao executar o ban.

O WhatsApp recusou a ação.`
      });
    }
  }
};

export default command;