import fs from "fs";
import zlib from "zlib";
import path from "path";
import { drive } from "./drive";

const DB_PATH = "data/uchiha.sqlite";
const BACKUP_PATH = "data/uchiha.sqlite.gz";
const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID!;

export async function backupSQLite() {
  await new Promise<void>((res, rej) => {
    fs.createReadStream(DB_PATH)
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream(BACKUP_PATH))
      .on("finish", () => res())
      .on("error", rej);
  });

  await drive.files.create({
    requestBody: {
      name: `uchiha-${Date.now()}.sqlite.gz`,
      parents: [DRIVE_FOLDER_ID]
    },
    media: {
      mimeType: "application/gzip",
      body: fs.createReadStream(BACKUP_PATH)
    }
  });

  fs.unlinkSync(BACKUP_PATH);
}
