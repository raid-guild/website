import { readFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const htmlPath = join(process.cwd(), "public", "witch", "index.html");
    const htmlContent = await readFile(htmlPath, "utf-8");
    const baseHref = request.nextUrl.pathname.endsWith("/")
      ? request.nextUrl.pathname
      : `${request.nextUrl.pathname}/`;
    const htmlWithBase = htmlContent.includes("<base")
      ? htmlContent
      : htmlContent.replace(
          "<head>",
          `<head>\n    <base href="${baseHref}" />`
        );

    return new NextResponse(htmlWithBase, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Page not found", { status: 404 });
  }
}
