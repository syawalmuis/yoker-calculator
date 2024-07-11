import { FileToJSON, JSONToFile } from "@/utils/converter";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = (await request.json()) as Game;
    // JSONToFile(data, data.id);
    return NextResponse.json(data);
}
