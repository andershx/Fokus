import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { text } = await req.json().catch(() => ({ text: "" }));
  const apiKey = process.env.OPENAI_API_KEY;

  function fallback() {
    const lines = (text || "").split(/\n|•|-/).map(s => s.trim()).filter(Boolean);
    const tasks = lines.slice(0, 6).map((t, i) => ({ id: String(Date.now()) + "-" + i, text: t }));
    return NextResponse.json({ tasks });
  }

  if (!apiKey) return fallback();

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Extract 3-8 action items as JSON array: [{text, assignee?, due?}]. No prose." },
          { role: "user", content: text || "" }
        ]
      })
    });
    const data = await r.json();
    const raw = data?.choices?.[0]?.message?.content || "[]";
    let tasks;
    try { tasks = JSON.parse(raw); } catch { return fallback(); }
    tasks = (Array.isArray(tasks) ? tasks : []).map((t: any, i: number) => ({
      id: String(Date.now()) + "-" + i,
      text: t.text || "Untitled task",
      assignee: t.assignee,
      due: t.due
    }));
    return NextResponse.json({ tasks });
  } catch {
    return fallback();
  }
}
