    import { NextResponse } from "next/server";
    import { db } from "@/lib/db";

    export async function POST(req) {
    try {
        const body = await req.json();

        const { userId, points } = body;

        if (!userId || !points) {
        return NextResponse.json(
            { error: "Missing userId or points" },
            { status: 400 }
        );
        }

        await db.query(
        `
        UPDATE users
        SET communication_points = communication_points + $1
        WHERE id = $2
        `,
        [points, userId]
        );

        return NextResponse.json({
        success: true,
        message: "Points updated successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
        { error: "Server Error" },
        { status: 500 }
        );
    }
    }