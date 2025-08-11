import { NextResponse } from "next/server";

export const runtime = "nodejs";
export async function GET() {
  const presets = {
    Interview: [
      "Open with a concise elevator pitch",
      "Ask about success criteria for the role",
      "Clarify timeline and next steps",
      "Close with a memorable takeaway"
    ],
    Sales: [
      "Surface 1 pain point from discovery",
      "Map feature → outcome in 1 sentence",
      "Handle 1 objection with a question",
      "Confirm budget, timeline, decision maker"
    ],
    Support: [
      "Restate the issue in your own words",
      "Check environment and version quickly",
      "Offer 2 fixes; pick the safer by default",
      "Confirm resolution and provide recap link"
    ],
    Homework: [
      "Summarize the prompt in 2 lines",
      "List 3 steps to solve",
      "Define 'done' / acceptance criteria",
      "Leave a note-to-self for next session"
    ]
  };
  return NextResponse.json({ presets });
}
