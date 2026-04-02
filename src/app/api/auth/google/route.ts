import { NextResponse } from "next/server";
import { getAuthClient } from "@/lib/googleCalendar";

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

export async function GET() {
  const oAuth2Client = getAuthClient();

  if (!oAuth2Client) {
    return NextResponse.json(
      { error: "Google OAuth client not configured" },
      { status: 500 },
    );
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent", // Forces Google to return a refresh token
  });

  return NextResponse.redirect(authUrl);
}
