export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: "Pursuing" | "Completed";
  grade?: string;
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
}
