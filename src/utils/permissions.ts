import type { CommandContext } from "../types/Command";

export async function checkAdmin(
  sock: CommandContext["sock"],
  msg: CommandContext["msg"]
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
    .filter((p: { admin?: string | null }) => p.admin) // 👈 qualquer admin
    .map((p: { id: string }) => p.id);

  return {
    isGroup: true,
    senderIsAdmin: admins.includes(senderId),
    botIsAdmin: admins.includes(botId)
  };
}