import { WASocket } from "@whiskeysockets/baileys";
import { getLegendas } from "../storage/legendasStore";

export async function groupLeave(
  sock: WASocket,
  jid: string,
  participant: string
) {
  const legendas = getLegendas(jid);
  if (!legendas) return;

  const texto =
    legendas.saiu2 && Math.random() > 0.5
      ? legendas.saiu2
      : legendas.saiu;

  if (!texto) return;

  await sock.sendMessage(jid, {
    text: texto.replace(/@user/gi, `@${participant.split("@")[0]}`),
    mentions: [participant]
  });
}
