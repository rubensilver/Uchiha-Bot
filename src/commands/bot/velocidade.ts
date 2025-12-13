// src/commands/bot/velocidade.ts

export default {
    name: "velocidade",
    description: "Testa a velocidade do bot (estilo Uchiha).",

    async execute(sock: any, msg: any) {
        const inicio = performance.now();

        await sock.sendMessage(msg.from, { text: "⚡ O chakra está fluindo..." });

        const fim = performance.now();
        const resultado = (fim - inicio).toFixed(2);

        await sock.sendMessage(msg.from, {
            text: `⚡ *Velocidade Uchiha*: ${resultado}ms\n“Quando o chakra desperta, até o vento obedece.”`
        });
    }
};
