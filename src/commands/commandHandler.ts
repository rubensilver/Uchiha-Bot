// src/commands/commandHandler.ts
import { WASocket, proto } from "@whiskeysockets/baileys";
import { Command, CommandContext } from "../types/Command";
import { getUserName } from "../utils/getUserName";
import { getPermissions } from "../utils/getPermissions";

const commands = new Map<string, Command>();

/**

Registra comandos (name + aliases)
*/
export function registerCommand(cmd: Command) {
commands.set(cmd.meta.name.toLowerCase(), cmd);


if (cmd.meta.alias) {
for (const alias of cmd.meta.alias) {
commands.set(alias.toLowerCase(), cmd);
}
}
}

/**

Retorna comando pelo nome
*/
export function getCommand(name: string): Command | undefined {
return commands.get(name.toLowerCase());
}


export async function handleCommand(
sock: WASocket,
msg: proto.IWebMessageInfo,
commandName: string,
args: string[]
) {
const cmd = getCommand(commandName);
if (!cmd) return false;

await runCommand(sock, msg, cmd, args);
return true;
}

/**

Executa o comando (SEM permissão)
*/
export async function runCommand(
sock: WASocket,
msg: proto.IWebMessageInfo,
cmd: Command,
args: string[]
) {
const jid = msg.key!.remoteJid!;
const user = msg.key!.participant || jid;


const { isAdmin, isOwner } = await getPermissions(sock, msg);

const ctx: CommandContext = {
sock,
msg,
args,

userJid: user,  
userName: getUserName(msg),  
isAdmin,  
isOwner,  

reply: async (text: string) => {  
  await sock.sendMessage(jid, { text });  
},  

mention: async (text: string) => {  
  await sock.sendMessage(jid, {  
    text,  
    mentions: [user],  
  });  
},

};

await cmd.run(ctx);
}