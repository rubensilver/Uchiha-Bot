// src/logs/logDono.ts
import { WASocket } from "@whiskeysockets/baileys";

interface LogDonoPayload {
  comando: string;
  executor: string;
  grupo?: string;
  alvo?: string;
  detalhe?: string;
}

export async function logDono(
  sock: WASocket,
  data: LogDonoPayload
) {

  const texto = `
👁️‍🗨️ LOG DONO — CLÃ UCHIHA

👤 Executor: ${data.executor}
📎 Comando: ${data.comando}
${data.grupo ? `🏷️ Grupo: ${data.grupo}` : ""}
${data.alvo ? `🎯 Alvo: ${data.alvo}` : ""}
${data.detalhe ? `🧾 Detalhe: ${data.detalhe}` : ""}

🕰️ ${new Date().toLocaleString("pt-BR")}
`;
}
