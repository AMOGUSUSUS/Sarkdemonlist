import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  try {
    const { playerName, demonName, videoUrl } = await req.json();

    // Check only for player name and level name (video is optional)
    if (!playerName || !demonName) {
      return NextResponse.json(
        { error: "Player name and demon name are required." },
        { status: 400 }
      );
    }

    // Insert into both level_name and demon_name to ensure Neon catches it regardless of column naming
    await sql`
      INSERT INTO submissions (
        player_name,
        level_name,
        demon_name,
        video_url
      )
      VALUES (
        ${playerName},
        ${demonName},
        ${demonName},
        ${videoUrl || null}
      )
    `;

    return NextResponse.json(
      { message: "Submission created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submission Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}