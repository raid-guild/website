import { NextRequest, NextResponse } from "next/server";
import { CONSULTATIONS_CREATE_MUTATION } from "@/lib/queries";
import client from "@/lib/gql-client";
import { consultationApiSchema } from "@/lib/validation";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body structure
    const validationResult = consultationApiSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((issue: z.ZodIssue) => ({
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

    const { consultData } = validationResult.data;

    // Get the token from the request headers or body
    const token =
      request.headers.get("authorization")?.replace("Bearer ", "") ||
      body.token;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication token required" },
        { status: 401 }
      );
    }

    // Create GraphQL client with token
    const gqlClient = client({ token });

    // Execute the mutation
    const result = await gqlClient.request(CONSULTATIONS_CREATE_MUTATION, {
      consultations: consultData,
    });

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: "Consultation submitted successfully",
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error submitting consultation:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to submit consultation",
        details: error.response?.errors || error,
      },
      { status: 500 }
    );
  }
}
