import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: any) {
    const { params } = context;
    const { rows } =
        await sql`select * from games where id=${params.id} limit 1`;

    if (rows.length <= 0) return NextResponse.json(false, { status: 404 });
    return NextResponse.json(JSON.parse(String(rows[0].body)));
}
