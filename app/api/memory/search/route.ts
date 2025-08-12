import { NextResponse } from "next/server";

const seed = [
  { when: "2025-05-12 10:14", snippet: "John flagged Q4 budget constraint; we agreed to reduce scope." },
  { when: "2025-06-02 15:40", snippet: "Customer asked for SOC2; action: share doc pack." },
  { when: "2025-07-21 09:05", snippet: "Pilot success metrics: 20% faster onboarding; collect baseline." }
];

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { q } = await req.json().catch(() => ({ q: "" }));
  const results = seed.filter(x => (x.snippet + " " + x.when).toLowerCase().includes((q||"").toLowerCase())).slice(0, 8);
  return NextResponse.json({ results });
}
