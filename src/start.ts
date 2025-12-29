// src/start.ts
import { connect } from "./connect.js";

export async function startBot() {
  try {
    await connect();
  } catch (err) {
    console.error("❌ Erro ao iniciar o bot:", err);
  }
}