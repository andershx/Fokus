import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { notes } = await req.json().catch(() => ({ notes: "" }));
  const apiKey = process.env.OPENAI_API_KEY;

  const fallback = `Subject: Quick recap + next steps

Hi all,

Thanks for the call today. Here’s a quick recap:
• Objectives clarified and timeline aligned
• Decisions: finalize scope by Friday
• Next steps: share assets, confirm owner, set check-in

Best,
Fokus`;

  if (!apiKey) return NextResponse.json({ email: fallback });

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Draft a short, professional recap email with bullets and next steps." },
          { role: "user", content: notes || "Summarize the meeting and propose next steps." }
        ]
      })
    });
    const data = await r.json();
    const email = data?.choices?.[0]?.message?.content || fallback;
    return NextResponse.json({ email });
  } catch {
    return NextResponse.json({ email: fallback });
  }
}
