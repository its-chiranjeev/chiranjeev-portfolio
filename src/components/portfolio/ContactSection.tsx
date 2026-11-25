import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";
import { CopyEmailButton } from "./CopyEmailButton";
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon, LeetCodeIcon } from "@/components/ui/icons";
import { SiteConfig } from "@/types/site";
import { Clock, Mail, MapPin, Phone, Send, Terminal } from "lucide-react";

interface ContactSectionProps {
  site: SiteConfig;
}

export function ContactSection({ site }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 border-b border-[var(--border-subtle)]">
      <Container>
        <SectionHeading
          badge="LET'S CONNECT"
          number="06"
          title="Direct Communication & Inquiries"
          description="Looking for opportunities in software engineering, full-stack development, and backend systems architecture."
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 bg-[var(--bg-surface)] border-[var(--border-subtle)] shadow-xl">
                <div className="flex items-center justify-between gap-2 mb-6 text-xs font-mono text-[var(--text-tertiary)] border-b border-[var(--border-subtle)] pb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[var(--accent-lime)]" />
                    <span>Send a Direct Message</span>
                  </div>
                  <span className="text-[10px] text-[var(--accent-lime)] font-mono uppercase bg-[var(--accent-lime-muted)] px-2 py-0.5 rounded border border-[var(--accent-lime)]/20">
                    Web3Forms Ready
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    Fill out the form below to start an engineering collaboration, technical consultation, or job opportunity discussion. All submissions deliver directly to my verified inbox.
                  </p>
                </div>

                <ContactForm />
              </Card>
            </div>

            {/* Secondary Column: Direct Channels & Social Information */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-6 sm:p-8 bg-[var(--bg-surface)] border-[var(--border-subtle)] shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-5 text-xs font-mono text-[var(--text-tertiary)] border-b border-[var(--border-subtle)] pb-4">
                    <Terminal className="w-4 h-4 text-[var(--accent-lime)]" />
                    <span>Direct Channels & Socials</span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2.5">
                    Let&apos;s build together.
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    Whether you are hiring for a backend engineering role, exploring an API collaboration, or seeking a technical consultation on NestJS, PostgreSQL, or microservice architecture, feel free to reach out directly through any of these channels.
                  </p>

                  {/* Direct Channels Stack */}
                  <div className="space-y-4 mb-6">
                    {/* Email Card */}
                    <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)]">
                          <Mail className="w-3.5 h-3.5 text-[var(--accent-lime)]" aria-hidden="true" />
                          <span>Primary Email</span>
                        </div>

                        {/* Top-Right Compact Icon-Only Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={`mailto:${site.email}`}
                            aria-label={`Send email to ${site.email}`}
                            title={`Send email to ${site.email}`}
                            className="relative inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-[var(--btn-tertiary-border)] bg-[var(--btn-tertiary-bg)] hover:bg-[var(--btn-tertiary-hover-bg)] hover:border-[var(--border-strong)] text-[var(--btn-tertiary-fg)] hover:text-[var(--btn-tertiary-hover-fg)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] after:absolute after:-inset-1 sm:after:hidden after:content-['']"
                          >
                            <Send className="w-3.5 h-3.5" aria-hidden="true" />
                            <span className="sr-only">Send email to {site.email}</span>
                          </a>
                          <CopyEmailButton email={site.email} />
                        </div>
                      </div>

                      <div>
                        <a
                          href={`mailto:${site.email}`}
                          className="font-mono text-sm sm:text-base font-semibold text-[var(--text-primary)] hover:text-[var(--accent-lime)] transition-colors break-all"
                        >
                          {site.email}
                        </a>
                      </div>
                    </div>

                    {/* Location Card */}
                    <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[var(--text-tertiary)]">
                          <MapPin className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                          <span>Location</span>
                        </div>
                        <p className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                          {site.location}
                        </p>
                      </div>

                      {site.phone && (
                        <div className="pt-2 border-t border-[var(--border-subtle)]">
                          <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[var(--text-tertiary)]">
                            <Phone className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                            <span>Phone</span>
                          </div>
                          <a
                            href={`tel:${site.phone.replace(/\s+/g, "")}`}
                            className="font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                          >
                            {site.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Availability / Response SLA Badge */}
                  <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center gap-3 text-xs font-mono mb-6">
                    <Clock className="w-4 h-4 text-[var(--accent-lime)] shrink-0" />
                    <span className="text-[var(--text-secondary)]">
                      Response SLA: <strong className="text-[var(--text-primary)] font-semibold">Within 24 Hours</strong>
                    </span>
                  </div>
                </div>

                {/* Socials Bar */}
                <div className="pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">
                    Social Channels:
                  </span>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a
                      href={site.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <GithubIcon className="w-4 h-4 text-[var(--accent-lime)]" />
                      <span>GitHub</span>
                    </a>

                    <a
                      href={site.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <LinkedinIcon className="w-4 h-4 text-[var(--accent-lime)]" />
                      <span>LinkedIn</span>
                    </a>

                    <a
                      href={site.socials.email}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[var(--accent-lime)]" />
                      <span>Gmail</span>
                    </a>

                    <a
                      href={site.socials.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <XIcon className="w-4 h-4 text-[var(--accent-lime)]" />
                      <span>X</span>
                    </a>

                    <a
                      href={site.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <InstagramIcon className="w-4 h-4 text-[var(--accent-lime)]" />
                      <span>Instagram</span>
                    </a>

                    <a
                      href={site.socials.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <LeetCodeIcon className="w-4 h-4 text-[var(--accent-lime)]" />
                      <span>LeetCode</span>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
