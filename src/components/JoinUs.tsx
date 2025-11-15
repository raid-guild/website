"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  RequiredFieldIndicator,
} from "@/components/ui/form";
import {
  joinUsFormSchema,
  type JoinUsFormData,
  transformApplicationDataToApiFormat,
} from "@/lib/validation";
import Image from "next/image";

const joinUsImages = [
  "/images/join-image-1-bw.png",
  "/images/join-image-1-c.png",
  "/images/join-image-2-bw.png",
  "/images/join-image-2-c.png",
];

export default function JoinUs() {
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
      name: "",
      email: "",
      discordHandle: "",
      showcaseComments: "",
      showcaseUrl: "",
      introduction: "",
    },
  });

  const onSubmit = async (data: JoinUsFormData) => {
    if (isSubmitting) return; // Prevent multiple submissions

    console.log("Join Us form submitted:", data);

    // Reset states
    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setErrorMessage("");

    try {
      // Transform form data to API format using the centralized function
      const applicationData = transformApplicationDataToApiFormat(data);

      // For now, we'll need a token. You might want to get this from your auth system
      const token = "your-auth-token-here"; // Replace with actual token logic

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ applicationData }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Application submitted successfully:", result);
        setSubmissionStatus("success");
        // Reset form after successful submission
        form.reset();
      } else {
        console.error("Failed to submit application:", result);
        setSubmissionStatus("error");
        setErrorMessage(
          result.error || "Failed to submit application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmissionStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Feedback components
  const SuccessState = () => (
    <div className="text-center space-y-4 p-8">
      <div className="flex items-center justify-center">
        <Image
          src="/raid-cup-fire-success.svg"
          alt="raid guild success"
          width="150"
          height="150"
        />
      </div>
      <h3 className="text-2xl font-semibold text-scroll-400">
        Your Words Have Been Passed On.
      </h3>
      <a
        className="text-neutral-400 text-sm font-body hover:text-moloch-300 transition-colors"
        href="https://discord.gg/raidguild"
        target="_blank"
      >
        Look for the Tavern Keeper in Discord
      </a>
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
            src="/raid-hour-glass.svg"
            alt="raid guild hourglass"
            width="150"
            height="150"
          />
        </div>
      </div>
    </div>
  );

  return (
    <section id="join-us" className="relative">
      <div className="container-custom relative min-h-[843px]">
        <div className="absolute bottom-0 left-0 z-0 pointer-events-none max-w-[632px]">
          <Image
            src={imageSrc}
            alt="Join Raid Guild"
            width={632}
            height={843}
            className="h-auto object-contain object-bottom"
            priority={false}
          />
        </div>
        <div className="relative z-10 py-12 lg:py-24">
          <div className="grid-custom gap-4">
            {/* Left Column - Header */}
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <div className="w-full max-w-[632px] text-center">
                <h2 className="text-heading-lg text-moloch-500 mb-8">
                  Let&apos;s Build
                  <br />
                  Something Legendary?
                </h2>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <h3 className="text-heading-lg font-bold text-moloch-500 mb-8">
                    Join Us
                  </h3>
                  {submissionStatus === "success" ? (
                    <p className="text-body-md">
                      Thank you for your interest in joining RaidGuild!
                    </p>
                  ) : (
                    <p className="text-body-lg font-body">
                      Ready to embark on your journey and join the ranks? Share
                      your tale with us—what epic skills await the Guild&apos;s
                      discovery?
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
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Name <RequiredFieldIndicator />
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
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
                                placeholder="Enter your email"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="discordHandle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discord Username</FormLabel>
                            <FormControl>
                              <Input placeholder="username#1234" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="introduction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Introduce Yourself <RequiredFieldIndicator />
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about yourself, your skills, and why you want to join Raid Guild..."
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="showcaseComments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Work You&apos;re Proud Of{" "}
                              <RequiredFieldIndicator />
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about a project, portfolio, or piece of work you're particularly proud of."
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="showcaseUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Link to Your Work <RequiredFieldIndicator />
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://github.com/username, https://portfolio.com, https://linkedin.com/in/username, etc."
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
