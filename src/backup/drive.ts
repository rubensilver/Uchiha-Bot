import { google } from "googleapis";
import path from "path";

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve("config/drive.credentials.json"),
  scopes: ["https://www.googleapis.com/auth/drive"]
});

export const drive = google.drive({ version: "v3", auth });
