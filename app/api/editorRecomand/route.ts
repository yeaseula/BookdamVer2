import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const maxCount = searchParams.get("maxCount");
    const size = searchParams.get("size")

    if (!maxCount || !size) {
        return NextResponse.json({ error: "categoryId required" }, { status: 400 });
    }

    const url = `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.ALADIN_KEY}&QueryType=ItemNewSpecial&SearchTarget=Book&Cover=${size}&MaxResults=${maxCount}&start=1&Output=JS&Version=20131101`;

    const res = await fetch(url);
    const data = await res.json();

  return Response.json(data);
}
