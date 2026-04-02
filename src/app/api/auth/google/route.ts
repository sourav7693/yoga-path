import { NextResponse } from "next/server";
import { getAuthClient } from "@/lib/googleCalendar";

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

export async function GET() {
   console.log("GOOGLE AUTH API HIT 🔥"); 
  const oAuth2Client = await getAuthClient(); 
  

  if (!oAuth2Client) {
    return NextResponse.json(
      { error: "Google OAuth client not configured" },
      { status: 500 },
    );
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/calendar.events"] 
  });

  console.log("AUTH URL:", authUrl);

  return NextResponse.redirect(authUrl);
}