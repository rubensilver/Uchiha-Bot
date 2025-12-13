// src/commands/bot/botinfo.ts

export default {
    name: "botinfo",
    description: "Informações completas do BOT.",

    async execute(sock: any, msg: any) {
        await sock.sendMessage(msg.from, {
            text: `
🌑『 *UCHIHA BOT – Informações* 』

🔥 Nome: UCHIHA BOT
🌀 Versão: 10.0.1
⚙️ Criador: Rúben Silver (Clã Uchiha)

“Um bot não nasce forte… ele evolui como um Sharingan.”
`
        });
    }
};
