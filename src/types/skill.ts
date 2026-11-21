export interface SkillItem {
  name: string;
  level?: "Core" | "Proficient" | "Familiar";
}

export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  skills: SkillItem[];
}
