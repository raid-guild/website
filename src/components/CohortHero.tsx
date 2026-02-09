"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "./ui/input";
import { trackEvent } from "fathom-client";
import { Button } from "./ui/button";

const cohortImages = [
  "/images/cohort-image-1-bw.webp",
  "/images/cohort-image-1-c.webp",
  "/images/cohort-image-2-bw.webp",
  "/images/cohort-image-2-c.webp",
];

type JoinUsProps = {
  referral?: string;
};

export default function CohortHero({ referral }: JoinUsProps) {
  // Deterministic image selection based on 10-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 10)); // 10 minutes
  const imageSrc = cohortImages[interval % cohortImages.length];

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
      const response = await fetch("/api/email-referrals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          ...(referral ? { referral } : {}),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");
        trackEvent("cohort-hero-email-signup");
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

  return (
    <section id="cohort-hero" className="relative bg-moloch-800">
      <div className="container-custom py-12 lg:py-24 lg:pt-36">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-[60px] order-2 lg:order-1">
            <div className="flex flex-col gap-10">
              <h1 className="text-heading-lg text-scroll-100 text-center">
                FORGE YOUR PATH.
                <br />
                EARN YOUR SEAT.
              </h1>
              <p className="text-heading-sm text-scroll-150 text-center">
                RaidGuild&apos;s monthly cohort is a 4-week proving ground where
                you embark on real projects, train with battle-tested builders,
                and claim your place in the premier design and dev collective of
                the decentralized realm.
              </p>
              <p className="text-body-lg text-scroll-150 text-center">
                Cohorts launch on the first Monday of each month. Limited seats.
              </p>
            </div>
            <Image
              src="/images/cohort-hero-divider.svg"
              alt="Divider"
              width={300}
              height={36}
            />
            <div className="flex flex-col gap-4 w-full">
              <h2 className="text-heading-md text-scroll-100 text-center">
                Pledge now, or venture forth for the full tale.
              </h2>
              {submissionStatus === "success" ? (
                <p className="text-body-lg text-scroll-100 text-center">
                  Check your inbox for next steps.
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 w-full lg:w-4/5 mx-auto"
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="hero-email"
                      className="contact-form-label-moloch-800"
                    >
                      Enter your email address
                    </label>
                    <Input
                      id="hero-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="contact-form-input-moloch-800 w-full"
                    />
                  </div>
                  {submissionStatus === "error" && (
                    <p className="text-body-md text-red-400">{errorMessage}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-btn-active"
                  >
                    {isSubmitting ? "Submitting..." : "Begin My Quest"}
                  </Button>
                </form>
              )}
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 order-1 lg:order-2">
            <Image
              src={imageSrc}
              alt="Cohort Hero"
              width={632}
              height={632}
              className="w-full max-w-[632px] h-auto mx-auto"
              style={{ width: "100%", height: "auto", maxWidth: "632px" }}
              sizes="(min-width: 1024px) 632px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
