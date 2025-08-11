import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { prompt, context } = await req.json().catch(() => ({ prompt: "", context: "" }));
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    const mock = `• Key point captured.\n• Possible objection: ask a clarifying question.\n• Quick fact: The average response time is under 200ms.`;
    return NextResponse.json({ text: mock });
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
          { role: "system", content: "You are a real-time call aide. Be concise, return 3–5 bullets." },
          { role: "user", content: `Prompt: ${prompt}\nContext: ${context || "N/A"}` }
        ]
      })
    });
    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content || "No response";
    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json({ text: "Assistant error: " + (e?.message || "unknown") }, { status: 200 });
  }
}
