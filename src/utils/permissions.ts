import { WASocket, proto } from "@whiskeysockets/baileys";

export async function checkAdmin(
  sock: WASocket,
  msg: proto.IWebMessageInfo
) {
  const jid = msg.key?.remoteJid;
  if (!jid || !jid.endsWith("@g.us")) {
    return {
      isGroup: false,
      senderIsAdmin: false,
      botIsAdmin: false
    };
  }

  const metadata = await sock.groupMetadata(jid);

  const senderId = msg.key?.participant!;
  const botId = sock.user!.id;

  const admins = metadata.participants
    .filter(p => p.admin) // 👈 qualquer admin
    .map(p => p.id);

  return {
    isGroup: true,
    senderIsAdmin: admins.includes(senderId),
    botIsAdmin: admins.includes(botId)
  };
}