import { connect } from "./connect";

/**
 * Inicia o bot chamando a função de conexão.
 */
export async function startBot() {
  try {
    await connect();
  } catch (err) {
    console.error("❌ Erro ao iniciar o bot:", err);
  }
}