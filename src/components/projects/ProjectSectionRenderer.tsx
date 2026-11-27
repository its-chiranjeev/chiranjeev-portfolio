import { ArchitectureSection } from "@/components/projects/sections/ArchitectureSection";
import { ChallengesSolutionsSection } from "@/components/projects/sections/ChallengesSolutionsSection";
import { CodeExampleSection } from "@/components/projects/sections/CodeExampleSection";
import { ContributionsSection } from "@/components/projects/sections/ContributionsSection";
import { GallerySection } from "@/components/projects/sections/GallerySection";
import { KeyFeaturesSection } from "@/components/projects/sections/KeyFeaturesSection";
import { OverviewSection } from "@/components/projects/sections/OverviewSection";
import { ResultsSection } from "@/components/projects/sections/ResultsSection";
import { CaseStudySection } from "@/types/project";

interface ProjectSectionRendererProps {
  section: CaseStudySection;
}

export function ProjectSectionRenderer({ section }: ProjectSectionRendererProps) {
  switch (section.type) {
    case "overview":
      return <OverviewSection section={section} />;
    case "architecture":
      return <ArchitectureSection section={section} />;
    case "contributions":
      return <ContributionsSection section={section} />;
    case "challenges-solutions":
      return <ChallengesSolutionsSection section={section} />;
    case "code-example":
      return <CodeExampleSection section={section} />;
    case "key-features":
      return <KeyFeaturesSection section={section} />;
    case "results":
      return <ResultsSection section={section} />;
    case "gallery":
      return <GallerySection section={section} />;
    default: {
      const _exhaustiveCheck: never = section;
      void _exhaustiveCheck;
      return null;
    }
  }
}
