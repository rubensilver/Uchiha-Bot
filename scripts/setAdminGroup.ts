import { initDB } from "../src/core/db.js";
import { BotRepo } from "../src/database/repositories/BotRepo.js";

async function main() {
  // 1️⃣ Inicializa o banco (OBRIGATÓRIO)
  await initDB();

  // 2️⃣ COLOQUE AQUI O JID REAL DO GRUPO ADMIN
  BotRepo.setAdminGroup("120363404637342148@g.us");

  console.log("✅ Grupo admin registrado com sucesso");
  process.exit(0);
}

main().catch(err => {
  console.error("❌ Erro ao registrar grupo admin:", err);
  process.exit(1);
});
