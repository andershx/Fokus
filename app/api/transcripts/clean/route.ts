import { NextResponse } from "next/server";

export const runtime = "nodejs";

function simpleClean(text: string) {
  // remove timestamps like 00:01:23.456 --> 00:01:25.000 or [00:01:23]
  let t = text.replace(/\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?\s+--\>\s+\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?/g, "");
  t = t.replace(/\[?\d{2}:\d{2}:\d{2}\]?/g, "");
  // collapse speaker labels like "Speaker 1:" with consistent form
  t = t.replace(/\n{2,}/g, "\n").replace(/[ \t]+/g, " ");
  return t.trim();
}

export async function POST(req: Request) {
  const { text } = await req.json().catch(()=>({ text: "" }));
  const apiKey = process.env.OPENAI_API_KEY;

  const cleaned = simpleClean(text || "");
  if (!apiKey) {
    // heuristic summary
    const summary = cleaned.split(/\.|\n/).filter(Boolean).slice(0,5).map(s=>s.trim()).join("\n• ");
    const out = `Cleaned Transcript:\n\n${cleaned}\n\nSummary:\n• ${summary || "N/A"}`;
    return NextResponse.json({ text: out });
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
          { role: "system", content: "You clean transcripts and produce brief, actionable summaries with bullets and action items." },
          { role: "user", content: `Transcript:\n${cleaned}\n\nTasks:\n1) Remove filler and timestamps.\n2) Normalize speakers if needed.\n3) Produce: Summary (5 bullets), Decisions, and Action Items.` }
        ]
      })
    });
    const data = await r.json();
    const textOut = data?.choices?.[0]?.message?.content || cleaned;
    return NextResponse.json({ text: textOut });
  } catch (e: any) {
    return NextResponse.json({ text: cleaned });
  }
}
