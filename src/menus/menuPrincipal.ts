export const menuPrincipal = (
  hora: string,
  data: string,
  usuario: string,
  version: string,
  dono: string,
  prefix: string
) => `╔═══════ ≪ ✧ ≫ ═══════╗
       ㄩ匚卄|卄卂 乃ㄖㄒ
       𝐕𝐞𝐫𝐬𝐢𝐨𝐧: ${version}
       𝐎𝐰𝐧𝐞𝐫: ${dono}
╚═══════════════════╝
┃ ⏰ 𝐇𝐨𝐫𝐚: ${hora}
┃ 📅 𝐃𝐚𝐭𝐚: ${data}
┃ 🧩 𝐏𝐫𝐞𝐟𝐢𝐱𝐨: \`${prefix}\`
┃ 👤 𝐔𝐬𝐮𝐚́𝐫𝐢𝐨: ${usuario}
`;