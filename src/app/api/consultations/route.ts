import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import {
  consultationApiSchema,
  type ConsultationApiData,
} from "@/lib/validation";
import { z } from "zod";

export const runtime = "nodejs";

type ConsultationData = ConsultationApiData["consultData"];

type ConsultationSummary = {
  contactName: string;
  email: string;
  bio: string;
  discord?: string;
  telegram?: string;
  projectName: string;
  description: string;
  specsLink?: string;
  specsKey: string;
  budget: string;
  timeline: string;
  priority: string;
  services: string[];
};

const DISCORD_MESSAGE_LIMIT = 2000;

const getEnv = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is not configured`);
  }

  return value;
};

const truncate = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value;

  return `${value.slice(0, maxLength - 3)}...`;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const stripTimelinePrefix = (value: string) =>
  value.replace(/^Timeline:\s*/i, "").replace(/\.$/, "");

const createSummary = (consultData: ConsultationData): ConsultationSummary => {
  const contact = consultData.consultations_contacts.data.contact.data;
  const contactInfo = contact.contact_info.data;

  return {
    contactName: contact.name,
    email: contactInfo.email,
    bio: contact.bio,
    discord: contactInfo.discord || undefined,
    telegram: contactInfo.telegram || undefined,
    projectName: consultData.name,
    description: consultData.description,
    specsLink: consultData.link || undefined,
    specsKey: consultData.specs_key,
    budget: consultData.budget_key,
    timeline: stripTimelinePrefix(consultData.additional_info),
    priority: consultData.delivery_priorities_key,
    services: consultData.consultations_services_required.data.map(
      (service) => service.guild_service_key
    ),
  };
};

const formatDiscordMessage = (summary: ConsultationSummary) => {
  const altContact = [
    summary.discord ? `Discord: ${summary.discord}` : null,
    summary.telegram ? `Telegram: ${summary.telegram}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const sections = [
    "**New consultation request**",
    `**Project:** ${summary.projectName}`,
    `**Contact:** ${summary.contactName}`,
    `**Email:** ${summary.email}`,
    altContact,
    `**Budget:** ${summary.budget}`,
    `**Timeline:** ${summary.timeline}`,
    `**Priority:** ${summary.priority}`,
    `**Services:** ${summary.services.join(", ")}`,
    `**Specs:** ${summary.specsLink || summary.specsKey}`,
    `**Bio:**\n${summary.bio}`,
    `**Description:**\n${summary.description}`,
  ].filter(Boolean);

  return truncate(sections.join("\n\n"), DISCORD_MESSAGE_LIMIT);
};

const formatEmail = (summary: ConsultationSummary) => {
  const fields = [
    ["Project", summary.projectName],
    ["Contact", summary.contactName],
    ["Email", summary.email],
    ["Discord", summary.discord],
    ["Telegram", summary.telegram],
    ["Budget", summary.budget],
    ["Timeline", summary.timeline],
    ["Priority", summary.priority],
    ["Services", summary.services.join(", ")],
    ["Specs", summary.specsLink || summary.specsKey],
  ].filter(([, value]) => value);

  const text = [
    "New consultation request",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Bio:",
    summary.bio,
    "",
    "Description:",
    summary.description,
  ].join("\n");

  const htmlFields = fields
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label || "")}:</strong> ${escapeHtml(
          value || ""
        )}</p>`
    )
    .join("");

  const html = `
    <h1>New consultation request</h1>
    ${htmlFields}
    <h2>Bio</h2>
    <p>${escapeHtml(summary.bio).replaceAll("\n", "<br />")}</p>
    <h2>Description</h2>
    <p>${escapeHtml(summary.description).replaceAll("\n", "<br />")}</p>
  `;

  return { text, html };
};

const sendDiscordMessage = async (content: string) => {
  const botToken = getEnv("DISCORD_BOT_TOKEN");
  const channelId = getEnv("DISCORD_CONSULTATION_CHANNEL_ID");

  const response = await fetch(
    `https://discord.com/api/v10/channels/${channelId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        allowed_mentions: { parse: [] },
      }),
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Discord notification failed: ${details}`);
  }
};

const sendConsultationEmail = async (summary: ConsultationSummary) => {
  const apiKey = getEnv("SENDGRID_API_KEY");
  const from = getEnv("SENDGRID_FROM_EMAIL");
  const recipients = getEnv("SENDGRID_TO_EMAILS")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    throw new Error("SENDGRID_TO_EMAILS must include at least one recipient");
  }

  sgMail.setApiKey(apiKey);

  const { text, html } = formatEmail(summary);

  await sgMail.send({
    to: recipients,
    from,
    replyTo: summary.email,
    subject: `New consultation request: ${summary.projectName}`,
    text,
    html,
  });
};

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
    const summary = createSummary(consultData);
    const discordMessage = formatDiscordMessage(summary);

    const notificationResults = await Promise.allSettled([
      sendDiscordMessage(discordMessage),
      sendConsultationEmail(summary),
    ]);

    const failedNotifications = notificationResults
      .map((result, index) => ({
        result,
        service: index === 0 ? "discord" : "sendgrid",
      }))
      .filter(({ result }) => result.status === "rejected");

    if (failedNotifications.length > 0) {
      console.error(
        "Consultation notification failures:",
        failedNotifications.map(({ result, service }) => ({
          service,
          reason:
            result.status === "rejected" && result.reason instanceof Error
              ? result.reason.message
              : result,
        }))
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to submit consultation",
          details: failedNotifications.map(({ service }) => ({
            service,
            message: "Notification failed",
          })),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          discord: true,
          email: true,
        },
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
        details: error.response?.errors || undefined,
      },
      { status: 500 }
    );
  }
}
