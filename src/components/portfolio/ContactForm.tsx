"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { env } from "@/lib/env";
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Loader2,
  Send,
} from "lucide-react";

export const PURPOSE_OPTIONS = [
  "Job Opportunity",
  "Freelance Project",
  "Backend Development",
  "Technical Consultation",
  "General Inquiry",
  "Other",
] as const;

export type PurposeOption = (typeof PURPOSE_OPTIONS)[number];

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  purpose?: string;
  customPurpose?: string;
  message?: string;
}

export function ContactForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState<PurposeOption>("Job Opportunity");
  const [customPurpose, setCustomPurpose] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const MAX_MESSAGE_LENGTH = 3000;
  const MIN_MESSAGE_LENGTH = 20;

  useEffect(() => {
    router.prefetch("/thank-you");
  }, [router]);

  // Validate all inputs before submission
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Full name must be at least 2 characters.";
    }

    // 2. Email Address
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please provide a valid email address (e.g., name@domain.com).";
    }

    // 3. Subject
    const trimmedSubject = subject.trim();
    if (!trimmedSubject) {
      newErrors.subject = "Subject is required.";
    } else if (trimmedSubject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    // 4. Purpose & Custom Purpose for "Other"
    if (!purpose) {
      newErrors.purpose = "Please select a purpose.";
    } else if (purpose === "Other") {
      const trimmedCustom = customPurpose.trim();
      if (!trimmedCustom) {
        newErrors.customPurpose = "Please specify your purpose.";
      } else if (trimmedCustom.length < 3) {
        newErrors.customPurpose = "Custom purpose must be at least 3 characters.";
      } else if (trimmedCustom.length > 100) {
        newErrors.customPurpose = "Custom purpose must not exceed 100 characters.";
      }
    }

    // 5. Message
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      newErrors.message = "Message is required.";
    } else if (trimmedMessage.length < MIN_MESSAGE_LENGTH) {
      newErrors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters (currently ${trimmedMessage.length}).`;
    } else if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent repeated submission when already in flight
    if (status === "submitting") return;

    // Clear previous status
    setErrorMessage(null);

    // Validate inputs
    if (!validateForm()) {
      setStatus("idle");
      return;
    }

    // Check Access Key
    const accessKey =
      env.web3formsAccessKey || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "Contact form submission service is temporarily unconfigured (missing access key). Please contact me directly via email."
      );
      return;
    }

    setStatus("submitting");

    // Honeypot check - silently simulate success if triggered by a bot
    if (botcheck) {
      setTimeout(() => {
        setStatus("success");
        router.push("/thank-you");
      }, 500);
      return;
    }

    // Format custom purpose if Other was chosen
    const finalPurpose =
      purpose === "Other"
        ? `Other: ${customPurpose.trim()}`
        : purpose;

    const payload = {
      access_key: accessKey,
      name: name.trim(),
      email: email.trim(),
      replyto: email.trim(),
      subject: `[Portfolio Inquiry] ${subject.trim()} (${finalPurpose})`,
      purpose: finalPurpose,
      message: message.trim(),
      from_name: `${name.trim()} (Portfolio Contact Form)`,
      botcheck: false,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus("success");
        // Reset form inputs only upon confirmed success
        setName("");
        setEmail("");
        setSubject("");
        setPurpose("Job Opportunity");
        setCustomPurpose("");
        setMessage("");
        setErrors({});
        // Direct visitor to dedicated thank-you experience
        router.push("/thank-you");
      } else {
        setStatus("error");
        setErrorMessage(
          data?.message ||
            "Unable to deliver your message through Web3Forms. Please try again or reach out directly at chiranjeevrastogi@gmail.com."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "A network error occurred while communicating with the submission service. Please check your internet connection or email directly."
      );
    }
  };

  return (
    <div className="w-full">
      {/* Submission Status Alerts */}
      <div role="status" aria-live="polite" className="mb-6">
        {status === "success" && (
          <div className="p-4 rounded-xl bg-[var(--accent-lime-muted)] border border-[var(--accent-lime)]/40 text-[var(--text-primary)] flex items-start gap-3">
            <CheckCircle2
              className="w-5 h-5 text-[var(--accent-lime)] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="space-y-1 text-sm font-mono">
              <p className="font-semibold text-[var(--accent-lime)]">
                Message sent successfully!
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Thank you for reaching out. I have received your inquiry and will get back to you as soon as possible.
              </p>
            </div>
          </div>
        )}

        {status === "error" && errorMessage && (
          <div
            role="alert"
            className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-[var(--text-primary)] flex items-start gap-3"
          >
            <AlertCircle
              className="w-5 h-5 text-rose-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="space-y-1 text-sm font-mono">
              <p className="font-semibold text-rose-400">Submission Notice</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {errorMessage}
              </p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Hidden Honeypot bot protection field */}
        <input
          type="checkbox"
          name="botcheck"
          id="botcheck"
          className="hidden"
          style={{ display: "none" }}
          checked={botcheck}
          onChange={(e) => setBotcheck(e.target.checked)}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
            >
              Full Name <span className="text-[var(--accent-lime)]">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="e.g. Alex Morgan"
              disabled={status === "submitting"}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={`w-full rounded-lg bg-[var(--bg-surface-elevated)] border px-3.5 py-2.5 text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent-lime)] focus:border-[var(--accent-lime)] disabled:opacity-50 ${
                errors.name
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500"
                  : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
              }`}
            />
            {errors.name && (
              <p
                id="contact-name-error"
                role="alert"
                className="text-xs font-mono text-rose-400 flex items-center gap-1 mt-1"
              >
                <span>&bull;</span> {errors.name}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-email"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
            >
              Email Address <span className="text-[var(--accent-lime)]">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="e.g. alex@company.com"
              disabled={status === "submitting"}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={`w-full rounded-lg bg-[var(--bg-surface-elevated)] border px-3.5 py-2.5 text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent-lime)] focus:border-[var(--accent-lime)] disabled:opacity-50 ${
                errors.email
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500"
                  : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
              }`}
            />
            {errors.email && (
              <p
                id="contact-email-error"
                role="alert"
                className="text-xs font-mono text-rose-400 flex items-center gap-1 mt-1"
              >
                <span>&bull;</span> {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Subject & Purpose */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Subject */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-subject"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
            >
              Subject <span className="text-[var(--accent-lime)]">*</span>
            </label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
              }}
              placeholder="e.g. Node.js Backend Role / Project Inquiry"
              disabled={status === "submitting"}
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "contact-subject-error" : undefined}
              className={`w-full rounded-lg bg-[var(--bg-surface-elevated)] border px-3.5 py-2.5 text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent-lime)] focus:border-[var(--accent-lime)] disabled:opacity-50 ${
                errors.subject
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500"
                  : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
              }`}
            />
            {errors.subject && (
              <p
                id="contact-subject-error"
                role="alert"
                className="text-xs font-mono text-rose-400 flex items-center gap-1 mt-1"
              >
                <span>&bull;</span> {errors.subject}
              </p>
            )}
          </div>

          {/* Purpose Dropdown */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-purpose"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
            >
              Inquiry Purpose <span className="text-[var(--accent-lime)]">*</span>
            </label>
            <div className="relative">
              <select
                id="contact-purpose"
                name="purpose"
                value={purpose}
                onChange={(e) => {
                  setPurpose(e.target.value as PurposeOption);
                  if (errors.purpose) setErrors((prev) => ({ ...prev, purpose: undefined }));
                  if (e.target.value !== "Other" && errors.customPurpose) {
                    setErrors((prev) => ({ ...prev, customPurpose: undefined }));
                  }
                }}
                disabled={status === "submitting"}
                aria-required="true"
                aria-invalid={!!errors.purpose}
                aria-describedby={errors.purpose ? "contact-purpose-error" : undefined}
                className="w-full rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] px-3.5 py-2.5 text-sm font-mono text-[var(--text-primary)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent-lime)] focus:border-[var(--accent-lime)] disabled:opacity-50 cursor-pointer"
              >
                {PURPOSE_OPTIONS.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    className="bg-[var(--bg-surface)] text-[var(--text-primary)]"
                  >
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {errors.purpose && (
              <p
                id="contact-purpose-error"
                role="alert"
                className="text-xs font-mono text-rose-400 flex items-center gap-1 mt-1"
              >
                <span>&bull;</span> {errors.purpose}
              </p>
            )}
          </div>
        </div>

        {/* Dynamic Row: Conditional Custom Purpose when "Other" is chosen */}
        {purpose === "Other" && (
          <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center justify-between">
              <label
                htmlFor="contact-custom-purpose"
                className="block font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-lime)]"
              >
                Please specify your purpose <span className="text-[var(--accent-lime)]">*</span>
              </label>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                {customPurpose.length} / 100
              </span>
            </div>
            <input
              type="text"
              id="contact-custom-purpose"
              name="customPurpose"
              value={customPurpose}
              maxLength={100}
              onChange={(e) => {
                setCustomPurpose(e.target.value);
                if (errors.customPurpose) {
                  setErrors((prev) => ({ ...prev, customPurpose: undefined }));
                }
              }}
              placeholder="Describe your purpose (e.g., Code Review, Mentorship, Tech Talk)..."
              disabled={status === "submitting"}
              aria-required="true"
              aria-invalid={!!errors.customPurpose}
              aria-describedby={
                errors.customPurpose ? "contact-custom-purpose-error" : undefined
              }
              className={`w-full rounded-lg bg-[var(--bg-surface-elevated)] border px-3.5 py-2.5 text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent-lime)] focus:border-[var(--accent-lime)] disabled:opacity-50 ${
                errors.customPurpose
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500"
                  : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
              }`}
            />
            {errors.customPurpose && (
              <p
                id="contact-custom-purpose-error"
                role="alert"
                className="text-xs font-mono text-rose-400 flex items-center gap-1 mt-1"
              >
                <span>&bull;</span> {errors.customPurpose}
              </p>
            )}
          </div>
        )}

        {/* Row 3: Message Textarea */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="contact-message"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
            >
              Message <span className="text-[var(--accent-lime)]">*</span>
            </label>
            <span
              className={`text-[11px] font-mono tabular-nums ${
                message.length > MAX_MESSAGE_LENGTH
                  ? "text-rose-400 font-semibold"
                  : message.length >= MIN_MESSAGE_LENGTH
                  ? "text-[var(--accent-lime)]"
                  : "text-[var(--text-tertiary)]"
              }`}
            >
              {message.length} / {MAX_MESSAGE_LENGTH} characters
            </span>
          </div>

          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={message}
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            placeholder="Tell me about your project, team goals, timeline, or engineering inquiry (min 20 characters)..."
            disabled={status === "submitting"}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`w-full rounded-lg bg-[var(--bg-surface-elevated)] border px-3.5 py-3 text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent-lime)] focus:border-[var(--accent-lime)] disabled:opacity-50 resize-y min-h-[120px] ${
              errors.message
                ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500"
                : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
            }`}
          />

          {errors.message && (
            <p
              id="contact-message-error"
              role="alert"
              className="text-xs font-mono text-rose-400 flex items-center gap-1 mt-1"
            >
              <span>&bull;</span> {errors.message}
            </p>
          )}
        </div>

        {/* Submit Actions */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-tertiary)]">
            <HelpCircle className="w-3.5 h-3.5 text-[var(--accent-lime)] shrink-0" />
            <span>Delivers directly to chiranjeevrastogi@gmail.com</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={status === "submitting"}
            className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-1" aria-hidden="true" />
                <span>Submitting Inquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
