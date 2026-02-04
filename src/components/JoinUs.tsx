"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { trackEvent } from "fathom-client";
import { DISCORD_INVITE_URL } from "@/lib/data/constants";

const joinUsImages = [
  "/images/join-image-1-bw.webp",
  "/images/join-image-1-c.webp",
  "/images/join-image-2-bw.webp",
  "/images/join-image-2-c.webp",
];

export default function JoinUs() {
  // Deterministic image selection based on 8-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 8)); // 8 minutes
  const imageSrc = joinUsImages[interval % joinUsImages.length];

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !email) return;

    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/cohort-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");
        trackEvent("join-us-email-signup");
        setEmail("");
      } else {
        setSubmissionStatus("error");
        setErrorMessage(result.error || "Failed to submit. Please try again.");
      }
    } catch {
      setSubmissionStatus("error");
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const SuccessState = () => (
    <div className="text-center space-y-4 p-8">
      <h3 className="font-body text-3xl font-bold text-moloch-500">
        Check your inbox for next steps.
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
      <div className="pt-12 w-full">
        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          className="text-body-lg text-moloch-500 hover:text-moloch-800"
        >
          Look for the Tavern Keeper in Discord
        </a>
      </div>
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
        <div className="relative z-10 py-12 lg:py-24">
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
                      Thank you for your interest in joining RaidGuild!
                    </p>
                  ) : (
                    <p className="text-body-lg font-body">
                      Ready to embark on your journey and join the ranks? Enter
                      your email and we&apos;ll send you the next steps.
                    </p>
                  )}
                </div>

                {/* Form */}
                {submissionStatus === "success" ? (
                  <SuccessState />
                ) : submissionStatus === "error" ? (
                  <ErrorState />
                ) : isSubmitting ? (
                  <LoadingIndicator />
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="join-email"
                        className="contact-form-label-scroll-100"
                      >
                        Enter your email address
                      </label>
                      <Input
                        id="join-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="contact-form-input-scroll-100 w-full"
                      />
                    </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
