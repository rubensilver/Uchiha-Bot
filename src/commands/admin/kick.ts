import { Command } from "../../types/Command";

// 🔒 lock anti-lag / kick duplicado
const kickLocks = new Set<string>();

const command: Command = {
  meta: {
    name: "kick",
    category: "admin",
    description: "Remover membro do clã"
  },

  async run(ctx) {
    const { sock, msg } = ctx;
    const jid = msg.key?.remoteJid;
    if (!jid) return;

    // 🔒 apenas grupos
    if (!jid.endsWith("@g.us")) {
      await sock.sendMessage(jid, {
        text: `🌑 *Jutsu proibido*

Este comando só funciona em grupos.

👁️ *“O Sharingan só observa dentro do clã.”*`
      });
      return;
    }

    // 🎯 alvo: reply (qualquer tipo) ou menção
    const context = msg.message?.extendedTextMessage?.contextInfo;

    const rawTarget =
      context?.participant ||
      context?.mentionedJid?.[0];

    if (!rawTarget) {
      await sock.sendMessage(jid, {
        text: `❌ *Selo incompleto*

Responda **qualquer mensagem**
ou mencione o membro.

🩸 *“Toda técnica exige um alvo.”*`
      });
      return;
    }

    // ✅ NORMALIZA O JID (CORREÇÃO CRÍTICA)
    const target =
      rawTarget.split(":")[0] + "@s.whatsapp.net";

    // 🚫 não permite kick no próprio bot
    const botJid =
      sock.user?.id?.split(":")[0] + "@s.whatsapp.net";

    if (target === botJid) {
      await sock.sendMessage(jid, {
        text: `🌑 *Técnica anulada*

O Uchiha não pode atacar a si mesmo.`
      });
      return;
    }

    // 🚫 não permite kick no DONO do grupo
    const metadata = await sock.groupMetadata(jid);
    const owner = metadata.owner;

    if (target === owner) {
      await sock.sendMessage(jid, {
        text: `🌑 *Técnica proibida*

O líder do clã não pode ser removido.

👁️ *“Nem mesmo um Uchiha desafia o fundador.”*`
      });
      return;
    }

    // 🔒 anti-kick duplicado (lag / spam)
    const lockKey = `${jid}:${target}`;
    if (kickLocks.has(lockKey)) return;
    kickLocks.add(lockKey);

    try {
      // ⚔️ EXECUÇÃO REAL
      await sock.groupParticipantsUpdate(
        jid,
        [target],
        "remove"
      );

      await sock.sendMessage(jid, {
        text: `🔥 *Técnica executada: KICK*

O membro foi removido do clã.

👁️ *“A ordem foi cumprida sem hesitação.”*`,
        mentions: [target]
      });

    } catch {
      await sock.sendMessage(jid, {
        text: `🌑 *Técnica falhou*

Não foi possível remover o membro.

👁️ *“Nem toda batalha pode ser vencida.”*`
      });
    } finally {
      kickLocks.delete(lockKey);
    }
  }
};

export default command;