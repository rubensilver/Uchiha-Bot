export type LegendasConfig = {
  // status / flags
  welcome?: string;
  welcome2?: string;

  // atividades (no teu comando é texto, então STRING)
  atividades?: string;

  // === NOMES USADOS NOS COMANDOS ===
  legendabv?: string;
  legendabv2?: string;
  legendadoc?: string;
  legendaimg?: string;
  legendasaiu?: string;
  legendasaiu2?: string;
  legendavideo?: string;
  legendaestrangeiro?: string;

  // === NOMES USADOS NOS LISTENERS ===
  bv?: string;
  bv2?: string;
  doc?: string;
  img?: string;
  saiu?: string;
  saiu2?: string;
  video?: string;
  estrangeiro?: string;
};

const store = new Map<string, LegendasConfig>();

export function getLegendas(jid: string): LegendasConfig {
  return store.get(jid) || {};
}

export function setLegendas(jid: string, data: Partial<LegendasConfig>) {
  store.set(jid, { ...getLegendas(jid), ...data });
}