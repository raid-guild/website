import { NextRequest, NextResponse } from "next/server";
import { acceptsMarkdown, appendDiscoveryLinks, isInternalNextRequest, markdownForPath, mergeVary } from "@/lib/agent-readiness";

export function middleware(request: NextRequest) {
  const markdown = markdownForPath(request.nextUrl.pathname);
  if (markdown && !isInternalNextRequest(request.headers) && acceptsMarkdown(request.headers.get("accept"))) {
    return new NextResponse(markdown, {
      headers: { "Content-Type": "text/markdown; charset=utf-8", Link: appendDiscoveryLinks(null), Vary: "Accept" },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Link", appendDiscoveryLinks(response.headers.get("Link")));
  if (markdown) response.headers.set("Vary", mergeVary(response.headers.get("Vary"), "Accept"));
  return response;
}

export const config = { matcher: ["/", "/join", "/join/", "/witch", "/witch/"] };
