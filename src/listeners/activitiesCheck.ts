import { WASocket } from "@whiskeysockets/baileys";
import { getLegendas } from "../storage/legendasStore.js";

export async function activitiesCheck(
  sock: WASocket,
  jid: string
) {
  const legendas = getLegendas(jid);
  if (!legendas?.atividades) return;

  const meta = await sock.groupMetadata(jid);
  const total = meta.participants.length;

  if (total < Number(legendas.atividades)) {
    await sock.sendMessage(jid, {
      text: `🩸 *Atividade insuficiente*

👥 Usuários atuais: ${total}
📌 Mínimo exigido: ${legendas.atividades}

👁️ *“Sem número, não há movimento.”*`
    });
  }
}
