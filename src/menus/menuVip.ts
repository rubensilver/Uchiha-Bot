import * as fs from "fs";
import * as path from "path";

export const meta = {
  name: "menuvip",
  alias: ["vipmenu", "menu-vip", "vip"],
  category: "vip",
  description: "Menu VIP com todos os comandos automaticamente listados.",
};

export const run = async (sock, m) => {
  const jid = m.key.remoteJid;

  // 🔥 Caminho correto para a pasta REAL dos comandos VIP
  const vipDir = path.join(__dirname, "../commands/vip");

  let comandos = [];

  try {
    const files = fs.readdirSync(vipDir);

    for (const file of files) {
      if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

      const filePath = path.join(vipDir, file);
      const cmd = await import(filePath);

      if (cmd.meta) {
        comandos.push({
          name: cmd.meta.name || file.replace(".ts", ""),
          desc: cmd.meta.description || "Sem descrição",
        });
      }
    }
  } catch (err) {
    console.error("Erro ao carregar comandos VIP:", err);
  }

  const lista = comandos
    .map(
      (c, i) =>
        `${i + 1}️⃣ • *${c.name}*\n🩸 _${c.desc}_\n`
    )
    .join("\n");

  const text = `
🔥 ⌬ *CLÃ UCHIHA — SEÇÃO VIP* ⌬ 🔥
══════════════════════════════

🌑 *"Aqueles que caminham pelas sombras despertam o verdadeiro poder."*

👑 *Zona de Elite — Menu VIP*
Os comandos abaixo são exclusivos dos guerreiros marcados com o Sangue Uchiha.

${lista}

══════════════════════════════
🌕 *"O poder é dado apenas àqueles fortes o suficiente para protegê-lo."*
`;

  await sock.sendMessage(jid, { text });
};