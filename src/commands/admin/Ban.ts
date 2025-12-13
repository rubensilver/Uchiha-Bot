export const meta = {
  name: "ban",
  alias: ["ban"],
  category: "admin",
  description: "Banir usuário do grupo.",
};

export const run = async (sock, m, args) => {
  try {
    const jid = m.key.remoteJid;

    if (!jid.endsWith("@g.us")) {
      return sock.sendMessage(jid, { text: "⚠️ Este comando só funciona em grupos." });
    }

    // Pega o autor da mensagem corretamente
    const sender =
      m.key.participant ||
      m.participant ||
      m.message?.extendedTextMessage?.contextInfo?.participant ||
      m.key.remoteJid;

    const group = await sock.groupMetadata(jid);

    const botNumber = sock.user.id.split(":")[0] + "@s.whatsapp.net";

    const admins = group.participants.filter(p => p.admin === "admin" || p.admin === "superadmin");

    const isBotAdmin = admins.some(a => a.id === botNumber);
    const isUserAdmin = admins.some(a => a.id === sender);

    if (!isBotAdmin) {
      return sock.sendMessage(jid, { text: "❌ Eu preciso ser administrador para banir alguém." });
    }

    if (!isUserAdmin) {
      return sock.sendMessage(jid, { text: "❌ Apenas administradores podem usar este comando." });
    }

    const mention =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      (args[0] ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net" : null);

    if (!mention) {
      return sock.sendMessage(jid, { text: "⚠️ Marque alguém para banir." });
    }

    await sock.groupParticipantsUpdate(jid, [mention], "remove");

    await sock.sendMessage(jid, {
      text: `🔥 *Clã Uchiha — Ban* 🔥\n\n🥀 Usuário removido do grupo.`,
    });

  } catch (e) {
    console.log("ERRO NO BAN:", e);
    await sock.sendMessage(m.key.remoteJid, { text: "❌ Erro ao executar ban." });
  }
};