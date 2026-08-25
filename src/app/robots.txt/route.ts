import { ROBOTS_TEXT } from "@/lib/agent-readiness";

export function GET() {
  return new Response(ROBOTS_TEXT, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
