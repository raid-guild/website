"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type FormStatus = "idle" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  bio: string;
  altContactName: string;
  altContactChannel: string;
  projectName: string;
  description: string;
  specsLink: string;
  budget: string;
  timeline: string;
  services: string[];
  projectPriority: string;
};

type ValidationErrors = Record<string, string>;

const STEP_LABELS = [
  { id: "contact", label: "Contact Info" },
  { id: "description", label: "Project Description" },
  { id: "requirements", label: "Requirements & Timeline" },
];

const CONTACT_CHANNEL_OPTIONS = [
  { label: "Discord", value: "DISCORD" },
  { label: "Telegram", value: "TELEGRAM" },
];

const PROJECT_PRIORITY_OPTIONS = [
  { label: "Fast & Polished", value: "FAST_AND_POLISHED" },
  { label: "Fast & Inexpensive", value: "FAST_AND_INEXPENSIVE" },
  { label: "Polished & Inexpensive", value: "POLISHED_AND_INEXPENSIVE" },
];

const BUDGET_OPTIONS = [
  { label: "< $5k", value: "LESS_THAN_FIVE_THOUSAND" },
  { label: "$5k - $20k", value: "FIVE_TO_TWENTY_THOUSAND" },
  { label: "$20k - $50k", value: "TWENTY_TO_FIFTY_THOUSAND" },
  { label: "$50k +", value: "MORE_THAN_FIFTY_THOUSAND" },
  { label: "Not sure", value: "NOT_SURE" },
];

const TIMELINE_OPTIONS = [
  { label: "1-3 months", value: "1-3months" },
  { label: "3-6 months", value: "3-6 months" },
  { label: "6+ months", value: "6+ months" },
];

const SERVICES_OPTIONS = [
  { label: "Software Development", value: "DEVELOPMENT" },
  { label: "Product & System Design", value: "UX" },
  { label: "Marketing & Content Strategy", value: "MARKETING" },
  { label: "DAO Consulting & Governance", value: "DAO" },
];

const INITIAL_DATA: FormData = {
  name: "",
  email: "",
  bio: "",
  altContactName: "",
  altContactChannel: CONTACT_CHANNEL_OPTIONS[0]?.value ?? "",
  projectName: "",
  description: "",
  specsLink: "",
  budget: "",
  timeline: "",
  services: [],
  projectPriority: PROJECT_PRIORITY_OPTIONS[0]?.value ?? "",
};

export default function HireUsForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepCompletion = useMemo(() => {
    return STEP_LABELS.map((_, index) => {
      if (index > currentStep) {
        return false;
      }

      return validateStep(index, formData).isValid;
    });
  }, [currentStep, formData]);

  const handleFieldChange = <Key extends keyof FormData>(
    key: Key,
    value: FormData[Key]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setValidationErrors((prev) => {
      if (!prev[key as string]) {
        return prev;
      }

      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const goToStep = (nextStep: number) => {
    if (nextStep < 0 || nextStep >= STEP_LABELS.length) return;
    if (nextStep > currentStep + 1) return;
    // allow backward navigation freely, forward only if passing validation
    if (nextStep <= currentStep) {
      setCurrentStep(nextStep);
      return;
    }

    const currentValidation = validateStep(currentStep, formData);
    setValidationErrors(currentValidation.errors);

    if (currentValidation.isValid) {
      setCurrentStep(nextStep);
    }
  };

  const handleNext = () => {
    goToStep(currentStep + 1);
  };

  const handlePrevious = () => {
    goToStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    const lastValidation = validateStep(currentStep, formData);
    setValidationErrors(lastValidation.errors);

    if (!lastValidation.isValid) {
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // mimic API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // eslint-disable-next-line no-console
      console.log("Hire Us submission", formData);

      setStatus("success");
      setFormData(INITIAL_DATA);
      setCurrentStep(0);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We couldn’t submit your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-scroll-100 border-2 border-moloch-800 rounded-md p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h3 className="text-heading-lg text-moloch-400">Request Received</h3>
          <p className="text-body-lg text-moloch-800">
            Thanks for reaching out. A member of Raid Guild will be in touch
            within 48 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
          }}
          className="mx-auto inline-flex items-center justify-center rounded-md border-2 border-moloch-800 px-6 py-2 text-label-md uppercase tracking-wide text-moloch-800 transition-colors hover:bg-moloch-800 hover:text-scroll-100"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-scroll-100 border-2 border-moloch-800 rounded-md p-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-heading-lg text-moloch-400">Let&apos;s Get Started</h3>
          <p className="text-body-md text-moloch-800">
            Use the form to share your project details. The more context you can
            provide, the faster we can assemble your raid party.
          </p>
          <nav className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STEP_LABELS.map((step, index) => {
              const isActive = index === currentStep;
              const isComplete = stepCompletion[index] && index !== currentStep;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goToStep(index)}
                  className={cn(
                    "rounded-md border-2 border-transparent px-4 py-3 text-left text-label-md transition-colors",
                    isActive && "bg-moloch-800 text-scroll-100",
                    !isActive &&
                      (isComplete
                        ? "bg-moloch-400 text-scroll-100 hover:bg-moloch-800"
                        : "bg-scroll-200 text-moloch-800 hover:border-moloch-400")
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="block text-label-sm uppercase tracking-wide">
                    {`0${index + 1}`}
                  </span>
                  <span className="block text-body-md font-medium">
                    {step.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {status === "error" && (
          <div className="rounded-md border border-moloch-400 bg-moloch-400/10 p-4 text-moloch-800">
            <p className="text-body-md font-medium">{errorMessage}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-3 inline-flex items-center justify-center rounded-md border border-moloch-800 px-4 py-2 text-label-sm uppercase tracking-wide text-moloch-800 hover:bg-moloch-800 hover:text-scroll-100"
            >
              Try Again
            </button>
          </div>
        )}

        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            if (currentStep === STEP_LABELS.length - 1) {
              handleSubmit();
            } else {
              handleNext();
            }
          }}
        >
          {currentStep === 0 && (
            <StepContact
              data={formData}
              errors={validationErrors}
              onChange={handleFieldChange}
            />
          )}

          {currentStep === 1 && (
            <StepProjectDetails
              data={formData}
              errors={validationErrors}
              onChange={handleFieldChange}
            />
          )}

          {currentStep === 2 && (
            <StepRequirements
              data={formData}
              errors={validationErrors}
              onChange={handleFieldChange}
            />
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="inline-flex items-center justify-center rounded-md border-2 border-moloch-800 px-6 py-2 text-label-md uppercase tracking-wide text-moloch-800 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "inline-flex items-center justify-center rounded-md px-6 py-2 text-label-md uppercase tracking-wide text-scroll-100 transition-colors",
                currentStep === STEP_LABELS.length - 1
                  ? "bg-moloch-800 hover:bg-moloch-700"
                  : "bg-moloch-400 hover:bg-moloch-800"
              )}
            >
              {isSubmitting
                ? "Submitting..."
                : currentStep === STEP_LABELS.length - 1
                ? "Complete"
                : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StepContact({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: ValidationErrors;
  onChange: <Key extends keyof FormData>(key: Key, value: FormData[Key]) => void;
}) {
  return (
    <div className="space-y-6">
      <FormField
        label="Your name"
        required
        error={errors.name}
      >
        <input
          id="name"
          value={data.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="What should we call you?"
          className="w-full rounded-md border border-moloch-800 bg-scroll-100 px-4 py-3 text-body-md text-moloch-800 outline-none focus:border-moloch-400"
        />
      </FormField>

      <FormField
        label="Email address"
        required
        error={errors.email}
      >
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={(event) => onChange("email", event.target.value)}
          placeholder="Where can we reach you?"
          className="w-full rounded-md border border-moloch-800 bg-scroll-100 px-4 py-3 text-body-md text-moloch-800 outline-none focus:border-moloch-400"
        />
      </FormField>

      <FormField
        label="Tell us about your role"
        required
        error={errors.bio}
      >
        <textarea
          id="bio"
          value={data.bio}
          onChange={(event) => onChange("bio", event.target.value)}
          placeholder="Describe your project involvement, please introduce yourself"
          className="h-28 w-full resize-none rounded-md border border-moloch-800 bg-scroll-100 px-4 py-3 text-body-md text-moloch-800 outline-none focus:border-moloch-400"
        />
      </FormField>

      <FormField
        label="Prefer another way to connect?"
        hint="Optional"
        error={errors.altContactName}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="altContactName"
            value={data.altContactName}
            onChange={(event) => onChange("altContactName", event.target.value)}
            placeholder="What is your username?"
            className="w-full rounded-md border border-moloch-800 bg-scroll-100 px-4 py-3 text-body-md text-moloch-800 outline-none focus:border-moloch-400 sm:flex-1"
          />
          <select
            id="altContactChannel"
            value={data.altContactChannel}
            onChange={(event) => onChange("altContactChannel", event.target.value)}
            className="w-full rounded-md border border-moloch-800 bg-scroll-100 px-4 py-3 text-body-md text-moloch-800 outline-none focus:border-moloch-400 sm:w-40"
          >
            {CONTACT_CHANNEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </FormField>
    </div>
  );
}

function StepProjectDetails({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: ValidationErrors;
  onChange: <Key extends keyof FormData>(key: Key, value: FormData[Key]) => void;
}) {
  return (
    <div className="space-y-6">
      <FormField
        label="Project or organization name"
        required
        error={errors.projectName}
      >
        <input
          id="projectName"
          value={data.projectName}
          onChange={(event) => onChange("projectName", event.target.value)}
          placeholder="What do you go by?"
          className="w-full rounded-md border border-moloch-800 bg-scroll-100 px-4 py-3 text-body-md text-moloch-800 outline-none focus:border-moloch-400"
        />
      </FormField>

      <FormField
        label="How can we help?"
        required
        error={errors.description}
      >
        <textarea
          id="description"
          value={data.description}
          onChange={(event) => onChange("description", event.target.value)}
          placeholder="What can Raid Guild build, scope, design, or source for you?"
          className="h-40 w-full resize-none rounded-md border border-moloch-800 bg-scroll-100 px-4 py-3 text-body-md text-moloch-800 outline-none focus:border-moloch-400"
        />
      </FormField>

      <FormField
        label="Do you have project specs?"
        hint="Optional"
        error={errors.specsLink}
      >
        <input
          id="specsLink"
          value={data.specsLink}
          onChange={(event) => onChange("specsLink", event.target.value)}
          placeholder="Link to docs, Figma files, or any materials"
          className="w-full rounded-md border border-moloch-800 bg-scroll-100 px-4 py-3 text-body-md text-moloch-800 outline-none focus:border-moloch-400"
        />
      </FormField>
    </div>
  );
}

function StepRequirements({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: ValidationErrors;
  onChange: <Key extends keyof FormData>(key: Key, value: FormData[Key]) => void;
}) {
  const toggleService = (value: string) => {
    const isSelected = data.services.includes(value);
    const next = isSelected
      ? data.services.filter((item) => item !== value)
      : [...data.services, value];
    onChange("services", next);
  };

  return (
    <div className="space-y-8">
      <FormField label="What matters most to you?" required error={errors.projectPriority}>
        <div className="grid gap-3 sm:grid-cols-3">
          {PROJECT_PRIORITY_OPTIONS.map((option) => {
            const isActive = data.projectPriority === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange("projectPriority", option.value)}
                className={cn(
                  "rounded-md border-2 px-4 py-3 text-label-md uppercase tracking-wide transition-colors",
                  isActive
                    ? "border-moloch-800 bg-moloch-800 text-scroll-100"
                    : "border-moloch-800/30 bg-scroll-200 text-moloch-800 hover:border-moloch-800"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="What&apos;s your budget range?" required error={errors.budget}>
          <select
            id="budget"
            value={data.budget}
            onChange={(event) => onChange("budget", event.target.value)}
            className="w-full rounded-md border border-moloch-800 bg-scroll-100 px-4 py-3 text-body-md text-moloch-800 outline-none focus:border-moloch-400"
          >
            <option value="" disabled>
              Select a budget range
            </option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="When do you need this done?" required error={errors.timeline}>
          <select
            id="timeline"
            value={data.timeline}
            onChange={(event) => onChange("timeline", event.target.value)}
            className="w-full rounded-md border border-moloch-800 bg-scroll-100 px-4 py-3 text-body-md text-moloch-800 outline-none focus:border-moloch-400"
          >
            <option value="" disabled>
              Select a timeline
            </option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Which services are you interested in?" required error={errors.services}>
        <div className="rounded-md border border-moloch-800 bg-scroll-100 p-4">
          <div className="flex flex-wrap gap-3">
            {SERVICES_OPTIONS.map((option) => {
              const isActive = data.services.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleService(option.value)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-label-sm transition-colors",
                    isActive
                      ? "border-moloch-800 bg-moloch-800 text-scroll-100"
                      : "border-moloch-800 text-moloch-800 hover:bg-moloch-800 hover:text-scroll-100"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {data.services.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.services.map((value) => {
                const label = SERVICES_OPTIONS.find((option) => option.value === value)?.label ?? value;
                return (
                  <span
                    key={value}
                    className="inline-flex items-center gap-2 rounded-full bg-moloch-400 px-3 py-1 text-label-sm text-scroll-100"
                  >
                    {label}
                    <button
                      type="button"
                      onClick={() => toggleService(value)}
                      className="rounded-full border border-scroll-100/60 px-1 text-xs"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </FormField>
    </div>
  );
}

function FormField({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-label-md text-moloch-800 font-medium">
          {label}
          {required ? <span className="text-moloch-400"> *</span> : null}
        </label>
        {hint ? (
          <span className="text-label-sm uppercase tracking-wide text-moloch-600">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p className="text-label-sm text-moloch-400">{error}</p>
      ) : null}
    </div>
  );
}

function validateStep(stepIndex: number, data: FormData) {
  const errors: ValidationErrors = {};

  if (stepIndex === 0) {
    if (!data.name.trim()) errors.name = "Name is required";
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Enter a valid email";
    }
    if (!data.bio.trim()) errors.bio = "Please tell us about your role";
  }

  if (stepIndex === 1) {
    if (!data.projectName.trim()) errors.projectName = "Project name is required";
    if (!data.description.trim()) errors.description = "Tell us what you need";
  }

  if (stepIndex === 2) {
    if (!data.projectPriority) errors.projectPriority = "Choose a priority";
    if (!data.budget) errors.budget = "Select a budget range";
    if (!data.timeline) errors.timeline = "Select a timeline";
    if (data.services.length === 0) errors.services = "Select at least one service";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
