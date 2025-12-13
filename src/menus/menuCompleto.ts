import { menuPrincipal } from './menuPrincipal';
import { menuOpcoes } from './menuOpcoes';

export function menuCompleto(info: {
    hora: string;
    data: string;
    usuario: string;
    version: string;
    dono: string;
    prefix: string;
}) {
    return `${menuPrincipal(
    info.hora,
    info.data,
    info.usuario,
    info.version,
    info.dono,
    info.prefix
)}
${menuOpcoes(info.prefix)}`;
}