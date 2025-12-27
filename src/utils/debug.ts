import colors from "colors";

const DEBUG = true; // ⬅️ desliga se quiser

export function debug(message: string, data?: any) {
  if (!DEBUG) return;

  console.log(
    colors.gray(`[DEBUG] ${message}`),
    data ? colors.gray(JSON.stringify(data)) : ""
  );
}
