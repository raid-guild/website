import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "Application intake has been deprecated",
    },
    { status: 410 }
  );
}
