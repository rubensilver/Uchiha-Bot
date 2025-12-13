// src/commands/bot/ping.ts

export default {
    name: "ping",
    description: "Mostra o tempo de resposta do Bot (Tema Uchiha).",

    async execute(sock: any, msg: any) {
        const start = Date.now();
        await sock.sendMessage(msg.from, { text: "⏳ O Sharingan está analisando..." });
        const latency = Date.now() - start;

        await sock.sendMessage(msg.from, {
            text: `🔥 *Ping Uchiha*: ${latency}ms\n“Até o tempo teme os Uchihas.”`
        });
    }
};
