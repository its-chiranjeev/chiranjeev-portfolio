import { educationData, certificationsData } from "@/data/education";
import { experienceData } from "@/data/experience";
import { siteConfig } from "@/data/site";
import { skillsData } from "@/data/skills";
import { CertificationItem, EducationItem } from "@/types/education";
import { ExperienceItem } from "@/types/experience";
import { SiteConfig } from "@/types/site";
import { SkillCategory } from "@/types/skill";

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export function getAllSkills(): SkillCategory[] {
  return skillsData;
}

export function getExperience(): ExperienceItem[] {
  return experienceData;
}

export function getEducation(): EducationItem[] {
  return educationData;
}

export function getCertifications(): CertificationItem[] {
  return certificationsData;
}
