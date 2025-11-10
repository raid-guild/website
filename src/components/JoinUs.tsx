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
  FormMessage,
  RequiredFieldIndicator,
} from "@/components/ui/form";
import {
  joinUsFormSchema,
  type JoinUsFormData,
  transformApplicationDataToApiFormat,
} from "@/lib/validation";
import Image from "next/image";
import { Button } from "./ui/button";

export default function JoinUs() {
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
    <div className="space-y-4 p-6 border rounded-lg bg-scroll-500">
      <p className="text-moloch-500">{errorMessage}</p>
      <button
        onClick={() => {
          setSubmissionStatus("idle");
          setErrorMessage("");
        }}
        className="bg-neutral-800 text-moloch-500 font-header text-lg uppercase tracking-wide mt-5 px-6 py-2 border-2 border-neutral-800 rounded-lg hover:bg-moloch-500 transition-colors"
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
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold">Join Us</h1>
        <div className="mx-auto w-full sm:w-3/4">
          {submissionStatus === "success" ? (
            <p className="text-center">
              Thank you for your interest in joining RaidGuild!
            </p>
          ) : (
            <p className="text-center">
              Ready to join the ranks? Tell us about yourself and why you want
              to be part of the Guild.
            </p>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto space-y-4">
        <Form {...form}>
          {submissionStatus === "success" ? (
            <SuccessState />
          ) : submissionStatus === "error" ? (
            <ErrorState />
          ) : isSubmitting ? (
            <LoadingIndicator />
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <RequiredFieldIndicator />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showcaseComments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Work You&apos;re Proud Of <RequiredFieldIndicator />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about a project, portfolio, or piece of work you're particularly proud of."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-label-md"
                >
                  {isSubmitting ? "Submitting..." : "Begin My Quest"}
                </Button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
}
