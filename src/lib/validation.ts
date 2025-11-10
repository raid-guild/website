import { z } from "zod";

// Base form schema for client-side validation
export const hireUsFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().min(1, {
    message: "Bio is required.",
  }),
  altContactChannel: z.string().optional(),
  altContactName: z.string().optional(),
  projectName: z.string().min(3, {
    message: "Project name is required.",
  }),
  description: z.string().min(10, {
    message: "Description is required.",
  }),
  specsLink: z.url().optional(),
  budget: z.string().min(1, {
    message: "Please select a budget range.",
  }),
  timeline: z.string().min(1, {
    message: "Please select a timeline.",
  }),
  services: z
    .array(z.object({ label: z.string(), value: z.string() }), {
      message: "Please select a service",
    })
    .min(1, {
      message: "Please select a service",
    }),
  projectPriority: z.string().min(1, {
    message: "Please select a project priority.",
  }),
});

// Server-side validation schema for the API
export const consultationApiSchema = z.object({
  consultData: z.object({
    consultations_contacts: z.object({
      data: z.object({
        contact: z.object({
          data: z.object({
            name: z.string().min(2, "Name must be at least 2 characters"),
            bio: z.string().min(1, "Bio is required"),
            contact_info: z.object({
              data: z.object({
                email: z.email("Valid email is required"),
                discord: z.string().optional(),
                telegram: z.string().optional(),
              }),
            }),
          }),
        }),
      }),
    }),
    type_key: z.string().min(1, "Type key is required"),
    specs_key: z.string().min(1, "Specs key is required"),
    link: z.string().optional(),
    name: z.string().min(3, "Project name must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    consultations_services_required: z.object({
      data: z
        .array(
          z.object({
            guild_service_key: z.string().min(1, "Service key is required"),
          })
        )
        .min(1, "At least one service must be selected"),
    }),
    budget_key: z.string().min(1, "Budget selection is required"),
    // desired_delivery_date: z.string().min(1, "Timeline selection is required"),
    additional_info: z.string().min(1, "Timeline selection is required"),
    delivery_priorities_key: z.string().min(1, "Project priority is required"),
    submission_type_key: z.string().min(1, "Submission type is required"),
    consultation_status_key: z
      .string()
      .min(1, "Consultation status is required"),
  }),
});

// Join Us form schema
export const joinUsFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  discordHandle: z.string().optional(),
  showcaseComments: z.string().min(10, {
    message:
      "Please describe the work you're proud of (at least 10 characters).",
  }),
  showcaseUrl: z.url({
    message: "Please enter a valid URL for your work.",
  }),
  introduction: z.string().min(10, {
    message: "Please provide a brief introduction (at least 10 characters).",
  }),
});

// Server-side validation schema for the API
export const applicationApiSchema = z.object({
  applicationData: z.object({
    contact_info: z.object({
      data: z.object({
        email: z.email("Valid email is required"),
        discord: z.string().optional(),
        github: z.string().optional(),
      }),
    }),
    name: z.string().min(3, "Project name must be at least 3 characters"),
    introduction: z
      .string()
      .min(10, "Introduction must be at least 10 characters"),
    comments: z
      .string()
      .min(10, "Showcase description must be at least 10 characters"),
    links: z.object({
      data: z.array(
        z.object({
          type: z.string(),
          link: z.url("Valid url is required"),
        })
      ),
    }),
  }),
});

// Type exports for use in components
export type HireUsFormData = z.infer<typeof hireUsFormSchema>;
export type JoinUsFormData = z.infer<typeof joinUsFormSchema>;
export type ConsultationApiData = z.infer<typeof consultationApiSchema>;
export type ApplicationApiData = z.infer<typeof applicationApiSchema>;

// Helper function to transform form data to API format
export const transformFormDataToApiFormat = (formData: HireUsFormData) => {
  return {
    consultations_contacts: {
      data: {
        contact: {
          data: {
            name: formData.name,
            bio: formData.bio,
            contact_info: {
              data: {
                email: formData.email,
                discord:
                  formData.altContactChannel === "DISCORD"
                    ? formData.altContactName
                    : "",
                telegram:
                  formData.altContactChannel === "TELEGRAM"
                    ? formData.altContactName
                    : "",
              },
            },
          },
        },
      },
    },
    type_key: "NEW",
    specs_key: Number(formData.specsLink?.length) > 1 ? "YES" : "NONE",
    link: formData.specsLink,
    name: formData.projectName,
    description: formData.description,
    consultations_services_required: {
      data: [
        ...formData.services.map((s: { value: string; label: string }) => ({
          guild_service_key: s.value,
        })),
      ],
    },
    budget_key: formData.budget,
    // desired_delivery_date: formData.timeline,
    additional_info: `Timeline: ${formData.timeline}.`,
    delivery_priorities_key: formData.projectPriority,
    submission_type_key: "UNPAID",
    consultation_status_key: "PENDING",
  };
};

// Helper function to transform application form data to API format
export const transformApplicationDataToApiFormat = (
  formData: JoinUsFormData
) => {
  return {
    contact_info: {
      data: {
        email: formData.email,
        discord: formData.discordHandle,
      },
    },
    name: formData.name,
    introduction: formData.introduction,
    comments: formData.showcaseComments,
    links: {
      data: [
        {
          type: "OTHER",
          link: formData.showcaseUrl,
        },
      ],
    },
  };
};
