// src/commands/bot/sistema.ts

import os from "os";

export default {
    name: "sistema",
    description: "Exibe informações do sistema em estilo Uchiha.",

    async execute(sock: any, msg: any) {
        await sock.sendMessage(msg.from, {
            text: `
🖤『 *SISTEMA – UCHIHA MODE* 』

💠 Plataforma: ${os.platform()}
💠 CPU: ${os.cpus()[0].model}
💠 Memória Livre: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB

“Não é o sistema que define o Shinobi…
é a determinação dentro dele.” 🔥`
        });
    }
};
