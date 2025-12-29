import { WASocket, proto } from "@whiskeysockets/baileys";
import { AntiStore } from "./AntiStore.js";

const floodCache = new Map<string, number[]>();

export async function handleFlood(
  sock: WASocket,
  msg: proto.IWebMessageInfo
) {
  if (!msg.key || !msg.key.remoteJid) return;
  const jid = msg.key.remoteJid!;
  const user = msg.key?.participant || jid;

  if (!AntiStore.isEnabled(jid, "anti-flood")) return;

  const key = `${jid}:${user}`;
  const now = Date.now();

  const times = floodCache.get(key) || [];
  const recent = times.filter(t => now - t < 6000);
  recent.push(now);
  floodCache.set(key, recent);

  if (recent.length < 5) return;

  await sock.sendMessage(jid, { delete: msg.key! });

  const warns = AntiStore.addWarn(jid, "anti-flood", user);

  if (warns >= 2 && jid.endsWith("@g.us")) {
    await sock.groupParticipantsUpdate(jid, [user], "remove");
    AntiStore.resetWarn(jid, "anti-flood", user);

    await sock.sendMessage(jid, {
      text: `🔥 *Julgamento Uchiha – Flood*

👁️ O fluxo excessivo quebrou o equilíbrio.
🩸 *“Até o chakra precisa de controle.”*`
    });
    return;
  }

  await sock.sendMessage(jid, {
    text: `⚠️ *Aviso Uchiha – Flood*

🌀 Mensagens em excesso detectadas.
👁️ Avisos: ${warns}/2

🌑 *“Fale com propósito, não com pressa.”*`
  });
}
