import fs from "fs";
import zlib from "zlib";
import { drive } from "./drive";

const DB_PATH = "data/uchiha.sqlite";

export async function restoreLatestBackup(folderId: string) {
  const { data } = await drive.files.list({
    q: `'${folderId}' in parents`,
    orderBy: "createdTime desc",
    pageSize: 1
  });

  const file = data.files?.[0];
  if (!file?.id) return;

  const res = await drive.files.get(
    { fileId: file.id, alt: "media" },
    { responseType: "stream" }
  );

  await new Promise((resolve, reject) => {
    (res.data as any)
      .pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream(DB_PATH))
      .on("finish", resolve)
      .on("error", reject);
  });
}
