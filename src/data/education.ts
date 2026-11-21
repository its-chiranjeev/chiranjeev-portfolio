import { CertificationItem, EducationItem } from "@/types/education";

export const educationData: EducationItem[] = [
  {
    id: "mca-aktu",
    degree: "Master of Computer Applications (MCA)",
    institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    period: "2026 — 2028",
    status: "Pursuing",
    highlights: [
      "Advanced studies in distributed systems, software architecture, algorithms, and database management.",
      "Focusing on enterprise backend design, scalable web services, and cloud engineering.",
    ],
  },
  {
    id: "bca-ccsu",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Chaudhary Charan Singh University (CCSU)",
    period: "2023 — 2026",
    status: "Completed",
    highlights: [
      "Core coursework in Data Structures, Object-Oriented Programming (Java/C++), Relational Database Management Systems (RDBMS), and Web Technologies.",
      "Developed independent backend and web development projects throughout the program.",
    ],
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-core-java",
    title: "Core Java Course",
    issuer: "Great Learning",
  },
  {
    id: "cert-ai",
    title: "Artificial Intelligence Course",
    issuer: "HP LIFE",
  },
];
