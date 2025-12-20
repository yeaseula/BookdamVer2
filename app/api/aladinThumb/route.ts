import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const size = searchParams.get("size");

    if (!query || !size) {
        return NextResponse.json({ error: "categoryId required" }, { status: 400 });
    }

    const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.ALADIN_KEY}&Query=${encodeURIComponent(query)}&QueryType=title&SearchTarget=Book&Cover=${size}&MaxResults=1&start=1&Output=JS&Version=20131101`;

    const res = await fetch(url);
    const data = await res.json();

    return Response.json(data);
}