// src/menus/menuCompleto.ts

import { menuPrincipal } from "./menuPrincipal";
import { menuOpcoes } from "./menuOpcoes";

// Aceita:
// 1) menuCompleto(prefix)
// 2) menuCompleto({ hora, data, usuario, version, dono, prefix })

type MenuCompletoInput =
  | string
  | {
      hora?: string;
      data?: string;
      usuario?: string;
      version?: string;
      dono?: string;
      prefix: string;
    };

export function menuCompleto(input: MenuCompletoInput) {
  const info =
    typeof input === "string"
      ? {
          hora: "--:--",
          data: "--/--/----",
          usuario: "Usuário",
          version: "v1.0.0",
          dono: "Uchiha Supremo",
          prefix: input,
        }
      : {
          hora: input.hora ?? "--:--",
          data: input.data ?? "--/--/----",
          usuario: input.usuario ?? "Usuário",
          version: input.version ?? "v1.0.0",
          dono: input.dono ?? "Uchiha Supremo",
          prefix: input.prefix,
        };

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