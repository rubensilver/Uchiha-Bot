import { proto, WASocket } from "@whiskeysockets/baileys";
import { getLegendas } from "../storage/legendasStore";

export async function groupLegendas(
  sock: WASocket,
  msg: proto.IWebMessageInfo
) {
  const jid = msg.key?.remoteJid;
  if (!jid || !jid.endsWith("@g.us")) return;

  const sender = msg.key?.participant ?? jid;
  const legendas = getLegendas(jid);
  if (!legendas) return;

  /* ───── IMAGEM ───── */
  if (msg.message?.imageMessage && legendas.img) {
    await sock.sendMessage(jid, {
      text: legendas.img,
      mentions: [sender]
    });
    return;
  }

  /* ───── DOCUMENTO ───── */
  if (msg.message?.documentMessage && legendas.doc) {
    await sock.sendMessage(jid, {
      text: legendas.doc,
      mentions: [sender]
    });
    return;
  }
}
