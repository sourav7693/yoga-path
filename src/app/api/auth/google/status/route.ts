// app/api/google/status/route.ts

import { NextResponse } from "next/server";
import { connectDb } from "@/lib/connection";
import { GoogleToken } from "@/models/GoogleToken";

export async function GET() {
  await connectDb();

  const token = await GoogleToken.findOne({});

  return NextResponse.json({
    connected: !!token,
  });
}