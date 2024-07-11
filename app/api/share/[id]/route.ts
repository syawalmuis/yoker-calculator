import { FileToJSON } from "@/utils/converter";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: any) {
    const { params } = context;
    const game = FileToJSON(params.id);

    if (!game) return NextResponse.json(game, { status: 404 });
    return NextResponse.json(JSON.parse(String(game)));
}
