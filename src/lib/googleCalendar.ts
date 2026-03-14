import path from "path";
import { google } from "googleapis";
import fs from "fs";

const CREDENTIALS_PATH = path.join(process.cwd(), "service-account-key.json");
const TOKEN_PATH = path.join(process.cwd(), "google-tokens.json");

let oAuth2Client: any = null;

const getAuthClient = () => {
  if (!oAuth2Client) {
    try {
      const content = fs.readFileSync(CREDENTIALS_PATH, "utf8");
      const credentials = JSON.parse(content);
      const { client_secret, client_id, redirect_uris } =
        credentials.installed || credentials.web;
      oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0],
      );
    } catch (error) {
      console.error("Error loading Google Cloud credentials:", error);
      return null;
    }
  }

  // Always reload token from disk if it exists to avoid stale memory state
  if (fs.existsSync(TOKEN_PATH)) {
    try {
      const token = fs.readFileSync(TOKEN_PATH, "utf8");
      oAuth2Client.setCredentials(JSON.parse(token));
    } catch (error) {
      console.error("Error loading Google tokens:", error);
    }
  }

  return oAuth2Client;
};

const calendar = google.calendar({
  version: "v3",
  auth: oAuth2Client, // This will be updated by setCredentials in getAuthClient
});

export { oAuth2Client, TOKEN_PATH, getAuthClient };
export default calendar;
