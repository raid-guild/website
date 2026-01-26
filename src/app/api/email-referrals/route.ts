import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const emailReferralSchema = z.object({
  email: z.email("Valid email is required"),
  referral: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = emailReferralSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: errors,
        },
        { status: 400 }
      );
    }

    const apiUrl = process.env.EMAIL_REFERRALS_API_URL;
    const apiKey = process.env.FORM_INGEST_API_KEY;

    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Email referral API is not configured",
        },
        { status: 500 }
      );
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-form-api-key": apiKey,
      },
      body: JSON.stringify(validationResult.data),
    });

    const contentType = response.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            (typeof responseBody === "object" &&
              responseBody &&
              "error" in responseBody &&
              responseBody.error) ||
            responseBody ||
            "Failed to submit email referral",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: responseBody || { ok: true },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting email referral:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit email referral",
      },
      { status: 500 }
    );
  }
}
