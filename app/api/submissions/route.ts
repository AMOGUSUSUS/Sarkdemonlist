import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  try {
    const { playerName, demonName, videoUrl } = await req.json();

    if (!playerName || !demonName || !videoUrl) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO submissions (
        player_name,
        demon_name,
        video_url
      )
      VALUES (
        ${playerName},
        ${demonName},
        ${videoUrl}
      )
    `;

    return NextResponse.json(
      { message: "Submission created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}