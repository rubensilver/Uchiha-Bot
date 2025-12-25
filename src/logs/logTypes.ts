export type LogNivel = "INFO" | "WARN" | "AÇÃO" | "ERRO";

export interface LogPayload {
  nivel: LogNivel;
  comando: string;
  executor: string;
  grupo?: string;
  alvo?: string;
  detalhe?: string;
}
