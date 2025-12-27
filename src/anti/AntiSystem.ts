// src/anti/AntiSystem.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { AntiStore } from "./AntiStore";

type DetectResult = string | null;

/**
 * Detecta infrações comuns
 */
function detectAnti(msg: proto.IWebMessageInfo): DetectResult {
  const m = msg.message;
  if (!m) return null;

  if (m.locationMessage) return "anti-loc";
  if (m.documentMessage) return "anti-doc";
  if (m.imageMessage) return "anti-img";
  if (m.audioMessage) return "anti-audio";
  if (m.videoMessage) return "anti-video";
  if (m.stickerMessage) return "anti-sticker";
  if (m.contactMessage) return "anti-contato";
  if (m.pollCreationMessage) return "anti-enquete";

  const text =
    m.conversation ||
    m.extendedTextMessage?.text ||
    "";

  if (/chat\.whatsapp\.com/i.test(text)) return "anti-linkgp";
  if (/https?:\/\//i.test(text)) return "anti-linkeasy";
  if (/(porno|xxx|sex)/i.test(text)) return "anti-porno";
  if (/(merda|porra|caralho)/i.test(text)) return "anti-palavrao";

  return null;
}

/**
 * Detecta fake / golpe
 */
function detectFake(msg: proto.IWebMessageInfo): boolean {
  const m = msg.message;
  if (!m) return false;

  let score = 0;

  const text =
    m.conversation ||
    m.extendedTextMessage?.text ||
    "";

  if (m.extendedTextMessage?.contextInfo?.isForwarded) score++;
  if (/ganhe dinheiro|pix grátis|clique aqui/i.test(text)) score++;
  if (/https?:\/\//i.test(text)) score++;
  if (text.length > 300) score++;

  return score >= 2;
}

/**
 * Sistema Anti principal
 * RETORNA:
 * true  -> mensagem foi tratada (deve ignorar no messenger)
 * false -> nada aconteceu
 */
export async function handleAnti(
  sock: WASocket,
  msg: proto.IWebMessageInfo
): Promise<boolean> {
  if (!msg.key || !msg.key.remoteJid) return false;

  const jid = msg.key.remoteJid;
  const user = msg.key.participant || jid;

  // 1️⃣ Detecta infração normal
  let anti = detectAnti(msg);

  // 2️⃣ Se não achou nada, tenta fake
  if (!anti && detectFake(msg)) {
    anti = "anti-fake";
  }

  if (!anti) return false;

  // 3️⃣ Verifica se o anti está ligado
  if (!AntiStore.isEnabled(jid, anti)) return false;

  // 4️⃣ Apaga mensagem
  await sock.sendMessage(jid, { delete: msg.key });

  // 5️⃣ Aplica warn
  const warns = AntiStore.addWarn(jid, anti, user);

  const maxWarn = AntiStore.getMaxWarn
    ? AntiStore.getMaxWarn(jid)
    : 2;

  // 6️⃣ Kick se atingir limite e for grupo
  if (warns >= maxWarn && jid.endsWith("@g.us")) {
    await sock.groupParticipantsUpdate(jid, [user], "remove");
    AntiStore.resetWarn(jid, anti, user);

    await sock.sendMessage(jid, {
      text: `🔥 *Julgamento Uchiha*

👁️ O usuário foi banido após ultrapassar os limites.
🩸 *“A paciência de um Uchiha não é infinita.”*`
    });

    return true;
  }

  // 7️⃣ Aviso
  await sock.sendMessage(jid, {
    text: `⚠️ *Aviso do Clã Uchiha*

🩸 Infração detectada: *${anti}*
👁️ Avisos: ${warns}/${maxWarn}

🌑 *“Observe. Aprenda. Não repita.”*`
  });

  return true;
}