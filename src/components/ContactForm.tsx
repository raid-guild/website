"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RequiredFieldIndicator,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { analyticsEvents, trackAnalyticsEvent } from "@/lib/analytics";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";

const CONTACT_SOURCE = "workflow-automation-contact";

type SubmissionStatus = "idle" | "success" | "error";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      automationNeeds: "",
    },
  });

  const handleSubmit = async (formData: ContactFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setErrorMessage("");

    trackAnalyticsEvent(analyticsEvents.contactFormSubmitAttempt, {
      source: CONTACT_SOURCE,
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmissionStatus("error");
        setErrorMessage(
          result.error || "Failed to submit contact request. Please try again.",
        );
        trackAnalyticsEvent(analyticsEvents.contactFormSubmitError, {
          source: CONTACT_SOURCE,
          reason: response.status === 400 ? "validation" : "server_error",
        });
        return;
      }

      setSubmissionStatus("success");
      form.reset();
      trackAnalyticsEvent(analyticsEvents.contactFormSubmitSuccess, {
        source: CONTACT_SOURCE,
      });
    } catch (error) {
      console.error("Error submitting contact request:", error);
      setSubmissionStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
      trackAnalyticsEvent(analyticsEvents.contactFormSubmitError, {
        source: CONTACT_SOURCE,
        reason: "network",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full">
      <h2 className="mb-6 text-heading-md font-bold text-moloch-500">
        Let&apos;s Get Started
      </h2>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email address <RequiredFieldIndicator />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    placeholder="Where can we reach you?"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="automationNeeds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What should we help automate? <RequiredFieldIndicator />
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[220px]"
                    placeholder="Tell us what coordination, workflow, or operational problems your system should solve."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {submissionStatus === "error" ? (
            <div className="space-y-4 rounded-md border bg-scroll-100 p-6">
              <p className="text-body-md text-moloch-500">{errorMessage}</p>
            </div>
          ) : null}

          {submissionStatus === "success" ? (
            <div className="space-y-2 rounded-md border border-moloch-500 bg-scroll-100 p-6">
              <h3 className="text-heading-sm text-moloch-500">
                The Fires Have Been Lit!
              </h3>
              <p className="text-body-md">
                Your request is in, and a member of the Guild will follow up by
                email.
              </p>
            </div>
          ) : null}

          <Button
            className="contact-btn-active mt-5 !h-auto !min-h-[48px] !w-full !gap-3 !px-6 !py-3 text-label-md sm:!w-auto sm:!min-w-[260px]"
            disabled={isSubmitting}
            rightIcon={<Send aria-hidden="true" />}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Start the conversation"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
