export type EmploymentType =
  | "Internship"
  | "Full-time"
  | "Contract"
  | "Independent";

export interface ExperienceCertificate {
  title: string;
  issuer: string;
  fileUrl: string;
  downloadName: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  logo?: string;
  employmentType: EmploymentType;
  location: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
  technologies: string[];
  certificate?: ExperienceCertificate;
}
