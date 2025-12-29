import { WASocket } from "@whiskeysockets/baileys";
import { AntiLigarState } from "../state/AntiLigarState.js";
import { debug } from "../utils/debug.js";

export function registerAntiLigar(sock: WASocket) {
  debug("Anti-ligar registrado");

  sock.ev.on("call", async (calls) => {
    if (!AntiLigarState.enabled) return;

    for (const call of calls) {
      if (call.status !== "offer") continue;

      try {
        await sock.rejectCall(call.id, call.from);
        await sock.sendMessage(call.from, {
          text: "🛡️ Ligação bloqueada."
        });
        debug(`Ligação bloqueada: ${call.from}`);
      } catch (err) {
        debug("Erro ao bloquear ligação", err);
      }
    }
  });
}
