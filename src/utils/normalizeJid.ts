/**
 * Normaliza JID para formato padrão @s.whatsapp.net
 * Remove : 0, :1, converte @lid para @s. whatsapp.net
 * Baseado na lógica de sucesso da BASE-SHIZUKU
 */
export function normalizeJid(
  jid: string, 
  participants?:  Array<{ id: string; jid?:  string; lid?: string }>
): string {
  if (!jid) return "";

  // ✅ PASSO 1: Se tem @lid, procura o JID real na lista
  if (jid.includes("@lid") && participants) {
    const found = participants.find(p => p.lid === jid);
    if (found && found.jid) {
      jid = found.jid;
    }
  }

  // ✅ PASSO 2: Remove :0 ou : 1 que a Baileys adiciona
  jid = jid.replace(/: 0@/, "@").replace(/:1@/, "@");

  // ✅ PASSO 3: Garante formato @s.whatsapp.net ou @g.us
  if (!jid.includes("@")) {
    jid += "@s.whatsapp.net";
  } else if (! jid.includes("@s.whatsapp.net") && !jid.includes("@g.us")) {
    jid = jid.replace(/@[\w.]+$/, "@s.whatsapp.net");
  }

  return jid;
}
