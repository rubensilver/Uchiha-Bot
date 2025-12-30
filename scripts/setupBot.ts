import { startDatabase } from "../src/database/index.ts";
import { BotRepo } from "../src/database/repositories/BotRepo.ts";

await startDatabase();

// 🔴 TROCA PELO JID REAL DO GRUPO ADMIN
BotRepo.setAdminGroup("1203630XXXXXX@g.us");

console.log("✅ Grupo admin registrado");
process.exit(0);
