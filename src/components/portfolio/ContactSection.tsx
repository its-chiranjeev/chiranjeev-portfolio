import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "./ContactForm";
import { CopyEmailButton } from "./CopyEmailButton";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  LeetCodeIcon,
} from "@/components/ui/icons";
import { SiteConfig } from "@/types/site";
import { Clock, Mail, Phone, Terminal, Send } from "lucide-react";

interface ContactSectionProps {
  site: SiteConfig;
}

export function ContactSection({ site }: ContactSectionProps) {
  const verifiedPhone = site.phone?.trim();
  const rawTel = verifiedPhone ? verifiedPhone.replace(/\s+/g, "") : "";

  return (
    <section id="contact" className="py-20 lg:py-24 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* =========================================================================
              LEFT COLUMN — CONTACT INTRODUCTION & COMPACT INFO CARDS
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-semibold text-[var(--accent-lime)]">
                  /06
                </span>
                <Badge variant="lime">CONTACT US</Badge>
              </div>

              {/* Prominent Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[var(--text-primary)] leading-[1.15] mb-4">
                Get in touch today.
              </h2>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-8">
                Have an engineering role, technical consultation, or backend systems collaboration in mind? Reach out directly via email, phone, or send an inquiry through the form.
              </p>

              {/* Two Compact Contact Information Cards */}
              <div className="space-y-3.5 mb-8">
                {/* 1. Email Card */}
                <div className="group p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all duration-200 shadow-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-lime-muted)] border border-[var(--accent-lime)]/20 flex items-center justify-center shrink-0 text-[var(--accent-lime)]">
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-0.5">
                        Email
                      </span>
                      <a
                        href={`mailto:${site.email}`}
                        className="font-mono text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-lime)] transition-colors truncate block"
                      >
                        {site.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`mailto:${site.email}`}
                      aria-label={`Send email to ${site.email}`}
                      title={`Send email to ${site.email}`}
                      className="relative w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] after:absolute after:-inset-1.5 sm:after:hidden after:content-['']"
                    >
                      <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    <CopyEmailButton email={site.email} />
                  </div>
                </div>

                {/* 2. Phone Card (displayed only if verified phone number exists) */}
                {verifiedPhone && (
                  <div className="group p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all duration-200 shadow-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent-lime-muted)] border border-[var(--accent-lime)]/20 flex items-center justify-center shrink-0 text-[var(--accent-lime)]">
                        <Phone className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-0.5">
                          Phone
                        </span>
                        <a
                          href={`tel:${rawTel}`}
                          className="font-mono text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-lime)] transition-colors truncate block"
                        >
                          {verifiedPhone}
                        </a>
                      </div>
                    </div>
                    <a
                      href={`tel:${rawTel}`}
                      aria-label={`Call ${verifiedPhone}`}
                      title={`Call ${verifiedPhone}`}
                      className="relative w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-lime)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] shrink-0 after:absolute after:-inset-1.5 sm:after:hidden after:content-['']"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>

              {/* Response Availability Banner */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center gap-3 text-xs font-mono mb-8">
                <Clock className="w-4 h-4 text-[var(--accent-lime)] shrink-0" aria-hidden="true" />
                <span className="text-[var(--text-secondary)]">
                  Availability: <strong className="text-[var(--text-primary)] font-semibold">Usually responds within 1–2 business days</strong>
                </span>
              </div>
            </div>

            {/* Social Connection Row */}
            <div className="pt-5 border-t border-[var(--border-subtle)]">
              <span className="block font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
                Connect on Socials
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-all after:absolute after:-inset-1 sm:after:hidden after:content-['']"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-all after:absolute after:-inset-1 sm:after:hidden after:content-['']"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={site.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Profile"
                  className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-all after:absolute after:-inset-1 sm:after:hidden after:content-['']"
                >
                  <XIcon className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                  <span>X</span>
                </a>
                <a
                  href={site.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode Profile"
                  className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-all after:absolute after:-inset-1 sm:after:hidden after:content-['']"
                >
                  <LeetCodeIcon className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                  <span>LeetCode</span>
                </a>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN — CONTACT FORM PANEL (VISUALLY DISTINCT SURFACE)
              ========================================================================= */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl rounded-2xl relative">
              {/* Form Panel Header */}
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[var(--accent-lime)]" aria-hidden="true" />
                  <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                    Send a Direct Message
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--accent-lime-muted)] text-[var(--accent-lime)] border border-[var(--accent-lime)]/20 shrink-0">
                  WEB3FORMS INTEGRATED
                </span>
              </div>

              {/* Renders complete existing ContactForm */}
              <ContactForm />
            </Card>
          </div>

        </div>
      </Container>
    </section>
  );
}
