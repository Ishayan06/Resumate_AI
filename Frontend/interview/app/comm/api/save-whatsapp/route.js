import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, phone } = body;

    if (!userId || !phone) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    await db.query(
      `
      UPDATE users
      SET whatsapp_number = $1
      WHERE id = $2
      `,
      [phone, userId]
    );

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}