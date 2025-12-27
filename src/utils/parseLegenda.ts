import type { CommandContext } from "../types/Command";

type ParseParams = {
  text: string;
  jid: string;
  user?: string;
  sock: CommandContext["sock"],
};

export async function parseLegenda({
  text,
  jid,
  user,
  sock
}: ParseParams) {
  let output = text;

  /* ───── data / hora ───── */
  const now = new Date();
  const hora = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const data = now.toLocaleDateString("pt-BR");

  output = output
    .replace(/@hora/g, hora)
    .replace(/@data/g, data);

  /* ───── grupo ───── */
  try {
    const meta = await sock.groupMetadata(jid);
    output = output.replace(/@grupo/g, meta.subject);
  } catch {}

  /* ───── usuário ───── */
  if (user) {
    output = output.replace(/@user/g, `@${user.split("@")[0]}`);
  }

  return output;
}
