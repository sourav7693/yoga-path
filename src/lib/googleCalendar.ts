import path from "path";
import { google } from "googleapis";
import fs from "fs";

const TOKEN_PATH = path.join(process.cwd(), "google-tokens.json");

let oAuth2Client: any = null;

const getAuthClient = () => {
  if (!oAuth2Client) {
    try {
      const client_id = process.env.GOOGLE_CLIENT_ID;
      const client_secret = process.env.GOOGLE_CLIENT_SECRET;
      const redirect_uri = process.env.GOOGLE_REDIRECT_URL;

      if (!client_id || !client_secret || !redirect_uri) {
        throw new Error("Missing Google OAuth environment variables");
      }

      oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uri,
      );
    } catch (error) {
      console.error("Error initializing Google OAuth client:", error);
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

// Initialize the client on module load if credentials exist
getAuthClient();

export default calendar;
