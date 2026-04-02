import { NextResponse } from "next/server";
import { getAuthClient } from "@/lib/googleCalendar";

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

export async function GET() {
  const oAuth2Client = await getAuthClient(); // ✅ await

  if (!oAuth2Client) {
    return NextResponse.json(
      { error: "Google OAuth client not configured" },
      { status: 500 },
    );
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  return NextResponse.redirect(authUrl);
}