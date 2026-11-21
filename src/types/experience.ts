export type EmploymentType =
  | "Internship"
  | "Full-time"
  | "Contract"
  | "Independent";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  employmentType: EmploymentType;
  location: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
  technologies: string[];
}
