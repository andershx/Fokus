import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { prompt } = await req.json().catch(() => ({ prompt: "" }));
  const apiKey = process.env.OPENAI_API_KEY;
  const baseBullets = [
    "• Clarify scope in one sentence.",
    "• Restate their goal to confirm alignment.",
    "• Offer a tradeoff: speed vs depth.",
  ];

  if (!apiKey) {
    return NextResponse.json({ text: baseBullets.join("\n") });
  }

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a live meeting whisperer. Return 3 short bullet cues." },
          { role: "user", content: prompt || "Give me 3 cues to keep this call moving." }
        ]
      })
    });
    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content || baseBullets.join("\n");
    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json({ text: baseBullets.join("\n") });
  }
}
