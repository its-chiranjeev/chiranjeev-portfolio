import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CopyEmailButton } from "./CopyEmailButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SiteConfig } from "@/types/site";
import { Mail, MapPin, Phone, Terminal } from "lucide-react";

interface ContactSectionProps {
  site: SiteConfig;
}

export function ContactSection({ site }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20">
      <Container>
        <SectionHeading
          badge="CONTACT"
          number="06"
          title="Direct Communication & Inquiries"
          description="Looking for opportunities in Node.js backend development, REST API engineering, and distributed systems."
        />

        <div className="max-w-3xl mx-auto">
          <Card className="p-6 sm:p-10 bg-[var(--bg-surface)] border-[var(--border-subtle)] shadow-xl">
            <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[var(--text-tertiary)]">
              <Terminal className="w-4 h-4 text-[var(--accent-lime)]" />
              <span>contact.direct_channel // open</span>
            </div>

            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              Let&apos;s build together.
            </h3>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-8">
              Whether you are hiring for a backend engineering role, exploring an API collaboration, or seeking a technical consultation on NestJS, PostgreSQL, or microservice architecture, feel free to reach out directly.
            </p>

            {/* Direct Channels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-[var(--text-tertiary)]">
                    <Mail className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                    <span>Primary Email</span>
                  </div>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-mono text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-lime)] transition-colors break-all"
                  >
                    {site.email}
                  </a>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button
                    href={`mailto:${site.email}`}
                    variant="primary"
                    size="sm"
                    className="font-mono text-xs"
                  >
                    Send Email
                  </Button>
                  <CopyEmailButton email={site.email} />
                </div>
              </div>

              {/* Location & Phone Card */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-4">
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

            {/* Socials Bar */}
            <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-[var(--text-tertiary)]">
                Verified Social Channels:
              </span>

              <div className="flex items-center gap-4">
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-[var(--accent-lime)]" />
                  <span>GitHub</span>
                </a>

                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-[var(--accent-lime)]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
