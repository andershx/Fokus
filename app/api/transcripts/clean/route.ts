import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { text } = await req.json().catch(() => ({ text: "" }));
  const apiKey = process.env.OPENAI_API_KEY;

  const fallback = (text || "")
    .replace(/\[\d{2}:\d{2}:\d{2}\]/g, "")
    .replace(/\b(uh|um|like|you know)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (!apiKey) {
    return NextResponse.json({ cleaned: fallback || "No input provided." });
  }

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Clean the transcript (remove filler, normalize), then write a concise summary with bullets and action items." },
          { role: "user", content: text || "" }
        ]
      })
    });
    const data = await r.json();
    const cleaned = data?.choices?.[0]?.message?.content || fallback;
    return NextResponse.json({ cleaned });
  } catch {
    return NextResponse.json({ cleaned: fallback });
  }
}
