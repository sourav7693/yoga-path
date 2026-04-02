import { NextResponse } from "next/server";
import { getAuthClient } from "@/lib/googleCalendar";
import { connectDb } from "@/lib/connection";
import { GoogleToken } from "@/models/GoogleToken";

export async function GET(request: Request) {
   console.log("GOOGLE AUTH API HIT 🔥"); 
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const oAuth2Client = await getAuthClient();

  if (!oAuth2Client) {
    return NextResponse.json(
      { error: "Google OAuth client not configured" },
      { status: 500 },
    );
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    console.log("TOKENS:", tokens);

 
    await connectDb();
    await GoogleToken.deleteMany({});
    await GoogleToken.create({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
      token_type: tokens.token_type,
      scope: tokens.scope,
    });

    return NextResponse.redirect("https://theyogapath.in/admin/manage-course");
  } catch (error) {
    console.error("Error retrieving access token", error);
    return NextResponse.json(
      { error: "Failed to authenticate with Google" },
      { status: 500 },
    );
  }
}