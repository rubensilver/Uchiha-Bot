import { WASocket, proto } from "@whiskeysockets/baileys";
import { getLegendas } from "../storage/legendasStore.js";

export async function foreignUser(
  sock: WASocket,
  msg: proto.IWebMessageInfo
) {
  const jid = msg.key?.remoteJid;
  const sender = msg.key?.participant;
  if (!jid || !sender) return;

  const legendas = getLegendas(jid);
  if (!legendas?.estrangeiro) return;

  const numberGroup = jid.split("@")[0];
  const numberUser = sender.split("@")[0];

  if (!numberUser.startsWith(numberGroup.slice(0, 4))) {
    await sock.sendMessage(jid, {
      text: legendas.estrangeiro,
      mentions: [sender]
    });
  }
}
