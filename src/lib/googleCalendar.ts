import { google } from "googleapis";
import { connectDb } from "@/lib/connection";
import { GoogleToken } from "@/models/GoogleToken";

let oAuth2Client: any = null;

const getAuthClient = async () => {
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

  try {
    await connectDb();
    const tokenDoc = await GoogleToken.findOne({});
    if (tokenDoc) {
      oAuth2Client.setCredentials({
        access_token: tokenDoc.access_token,
        refresh_token: tokenDoc.refresh_token,
        expiry_date: tokenDoc.expiry_date,
        token_type: tokenDoc.token_type,
      });
    }
  } catch (error) {
    console.error("Error loading Google tokens from DB:", error);
  }

  return oAuth2Client;
};

const calendar = google.calendar({ version: "v3" });

export { oAuth2Client, getAuthClient };
export default calendar;