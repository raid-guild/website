"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  RequiredFieldIndicator,
} from "@/components/ui/form";
import { joinUsFormSchema, type JoinUsFormData } from "@/lib/validation";
import Image from "next/image";
import { trackEvent } from "fathom-client";

const joinUsImages = [
  "/images/join-image-1-bw.webp",
  "/images/join-image-1-c.webp",
  "/images/join-image-2-bw.webp",
  "/images/join-image-2-c.webp",
];

type JoinUsProps = {
  referral?: string;
};

export default function JoinUs({ referral }: JoinUsProps) {
  // Deterministic image selection based on 8-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 8)); // 8 minutes
  const imageSrc = joinUsImages[interval % joinUsImages.length];
  // State management for user feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const form = useForm<JoinUsFormData>({
    resolver: zodResolver(joinUsFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: JoinUsFormData) => {
    if (isSubmitting) return; // Prevent multiple submissions

    console.log("Join Us email submitted:", data);

    // Reset states
    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/email-referrals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          ...(referral ? { referral } : {}),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Email referral submitted successfully:", result);
        setSubmissionStatus("success");

        //tracking
        trackEvent("join-us-submission");
        // Reset form after successful submission
        form.reset();
      } else {
        console.error("Failed to submit email referral:", result);
        setSubmissionStatus("error");
        setErrorMessage(
          result.error || "Failed to submit. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmissionStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Feedback components
  const SuccessState = () => (
    <div className="text-center space-y-4 p-8">
      <h3 className="font-body text-3xl font-bold text-moloch-500">
        You&apos;re On The List.
      </h3>
      <div className="flex items-center justify-center">
        <Image
          src="/images/Logomark.svg"
          alt="Raid Guild"
          width={169}
          height={159}
          className="flex-shrink-0"
        />
      </div>
      <p className="text-body-lg text-moloch-500">
        Watch your inbox for next steps.
      </p>
    </div>
  );

  const ErrorState = () => (
    <div className="space-y-4 p-6 border rounded-md bg-scroll-100">
      <p className="text-body-md text-moloch-500">{errorMessage}</p>
      <button
        onClick={() => {
          setSubmissionStatus("idle");
          setErrorMessage("");
        }}
        className="contact-btn-active mt-5"
      >
        Try Again
      </button>
    </div>
  );

  const LoadingIndicator = () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center animate-spin [animation-duration:7s]">
          <Image
            src="/images/Logomark.svg"
            alt="Raid Guild"
            width={169}
            height={159}
            className="flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );

  return (
    <section id="join-us" className="relative">
      <div className="container-custom relative min-h-[953px]">
        <div className="absolute top-0 md:top-1/2 md:-translate-y-1/2 right-0 z-0 pointer-events-none max-w-[632px]">
          <Image
            src={imageSrc}
            alt="Join Raid Guild"
            width={632}
            height={843}
            className="h-auto object-contain object-bottom md:object-center"
            priority={false}
          />
        </div>
        <div className="relative z-10 pt-[520px] pb-12 md:py-12 lg:py-24">
          <div className="grid-custom gap-4 min-h-[850px]">
            {/* Left Column - Form */}
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <div className="space-y-8 max-w-[632px] mr-auto">
                {/* Header */}
                <div className="text-center md:text-left">
                  <h3 className="text-heading-lg font-bold text-moloch-500 mb-8">
                    Join Us! Let&apos;s Build Something Legendary Together
                  </h3>
                  {submissionStatus === "success" ? (
                    <p className="text-body-md">
                      Thanks for joining the cohort updates.
                    </p>
                  ) : (
                    <p className="text-body-lg font-body">
                      Drop your email to start the onboarding journey.
                    </p>
                  )}
                </div>

                {/* Form */}
                <Form {...form}>
                  {submissionStatus === "success" ? (
                    <SuccessState />
                  ) : submissionStatus === "error" ? (
                    <ErrorState />
                  ) : isSubmitting ? (
                    <LoadingIndicator />
                  ) : (
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                      noValidate
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Email Address <RequiredFieldIndicator />
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@domain.com"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="contact-btn-active"
                        >
                          {isSubmitting ? "Submitting..." : "Begin My Quest"}
                        </button>
                      </div>
                    </form>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
