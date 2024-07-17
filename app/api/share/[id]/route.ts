import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(_: Request, context: any) {
    const { params } = context;
    const data =
        await sql`select * from games where id=${params.id}`;

    if (data.rows.length <= 0) return NextResponse.json(false, { status: 404 });
    return NextResponse.json(data.rows);
}
