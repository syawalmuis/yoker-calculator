import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // let game = {};
    const data = (await request.json()) as Game;
    const body = JSON.stringify(data);
    const { rows } = await sql`select * from games where id=${data.id} limit 1`;
    if (rows.length > 0) {
        await sql`update games set body=${body} where id=${data.id}`;
    } else {
        await sql`insert into games (id, body) values (${data.id}, ${body})`;
    }
    return NextResponse.json(data);
}

export async function GET(request: Request) {
    const games = await sql`select * from games limit 1`;
    return NextResponse.json(Math.floor(Math.random() * 50);
}
