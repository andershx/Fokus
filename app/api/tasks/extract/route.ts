// app/api/tasks/extract/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Task = {
  id: string;
  text: string;
  assignee?: string;
  due?: string;
};

export async function POST(req: Request) {
  const { text } = await req.json().catch(() => ({ text: "" }));
  const apiKey = process.env.OPENAI_API_KEY;

  // --- Heuristic fallback (no OpenAI key) ---
  function fallback() {
    const lines: string[] = (text ?? "")
      .split(/\n|•|-/)
      .map((s: string) => s.trim())
      .filter((s: string) => Boolean(s));
    const tasks: Task[] = lines.slice(0, 6).map((t: string, i: number) => ({
      id: String(Date.now()) + "-" + i,
      text: t,
    }));
    return NextResponse.json({ tasks });
  }

  if (!apiKey) return fallback();

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Extract up to 6 concise action items. Return each as 'text | assignee(optional) | due(optional)'." },
          { role: "user", content: text || "" }
        ],
      }),
    });
    const data = await r.json();
    const raw: string = data?.choices?.[0]?.message?.content || "";

    // Parse simple 'text | assignee | due' lines to Task[]
    const tasks: Task[] = raw
      .split(/\n|•/)
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0)
      .slice(0, 6)
      .map((line: string, i: number) => {
        const [t, a, d] = line.split("|").map((s: string) => s.trim());
        const task: Task = { id: String(Date.now()) + "-" + i, text: t || line };
        if (a) task.assignee = a;
        if (d) task.due = d;
        return task;
      });

    if (!tasks.length) return fallback();
    return NextResponse.json({ tasks });
  } catch {
    return fallback();
  }
}
