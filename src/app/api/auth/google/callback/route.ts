import { NextResponse } from "next/server";
import { oAuth2Client, TOKEN_PATH } from "@/lib/googleCalendar";
import fs from "fs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  if (!oAuth2Client) {
    return NextResponse.json(
      { error: "Google OAuth client not configured" },
      { status: 500 },
    );
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Save tokens locally so they persist across server restarts
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));

    // Redirect the user back to the course management page
    return NextResponse.redirect(new URL("/admin/manage-course", request.url));
  } catch (error) {
    console.error("Error retrieving access token", error);
    return NextResponse.json(
      { error: "Failed to authenticate with Google" },
      { status: 500 },
    );
  }
}
