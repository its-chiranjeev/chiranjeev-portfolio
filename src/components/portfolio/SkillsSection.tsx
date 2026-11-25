"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SkillCategory, ResolvedTechnology } from "@/types/skill";
import { getResolvedTechnologies } from "@/lib/skills";
import { TechnologyInfoPanel } from "@/components/skills/TechnologyInfoPanel";
import { Filter, ChevronDown } from "lucide-react";
import { BottomSheet, BottomSheetOption } from "@/components/ui/BottomSheet";
import { scrollToTarget } from "@/lib/smoothScroll";

const CATEGORY_SHORT_TITLES: Record<string, string> = {
  all: "All Categories",
  languages: "Programming",
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases",
  cloud: "Cloud",
  devops: "DevOps",
  security: "Security",
  testing: "Testing",
  fundamentals: "Computer Science",
  "cs-fundamentals": "Computer Science",
};

interface SkillsSectionProps {
  categories: SkillCategory[];
}

interface CategoryCardProps {
  category: SkillCategory;
  selectedTechId: string | null;
  onSelectTech: (id: string) => void;
  allResolvedTechnologies: ResolvedTechnology[];
  isSideBySide?: boolean;
}

function CategoryCard({
  category,
  selectedTechId,
  onSelectTech,
  allResolvedTechnologies,
  isSideBySide = false,
}: CategoryCardProps) {
  return (
    <Card
      className={`p-6 bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between rounded-2xl shadow-sm ${
        isSideBySide ? "border-[var(--border-strong)]/80" : ""
      }`}
    >
      <div>
        {/* Category Card Header */}
        <div className="pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-tight">
              {category.title}
            </h3>
            <span className="text-[10px] font-mono font-medium text-[var(--text-tertiary)] bg-[var(--bg-surface-elevated)] px-2 py-0.5 rounded-full border border-[var(--border-subtle)] shrink-0">
              {category.skills.length} skills
            </span>
          </div>
          {category.description && (
            <p className="text-xs text-[var(--text-tertiary)] mt-1.5 leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        {/* Skill Chips */}
        <div className="flex flex-wrap gap-2 pt-4">
          {category.skills.map((skill) => {
            const resolved = allResolvedTechnologies.find(
              (t) => t.name === skill.name
            );
            const isSelected = resolved?.id === selectedTechId;
            const isCore = skill.level === "Core";
            const isLearning = skill.level === "Learning";

            return (
              <button
                key={skill.name}
                type="button"
                onClick={() => resolved && onSelectTech(resolved.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[var(--accent-lime)] text-[var(--accent-lime-fg)] border-[var(--accent-lime)] font-bold shadow-md ring-2 ring-[var(--accent-lime)]/30"
                    : isCore
                    ? "bg-[var(--accent-lime-muted)] text-[var(--accent-lime)] border-[var(--accent-lime)]/30 hover:border-[var(--accent-lime)] font-medium"
                    : isLearning
                    ? "bg-[var(--badge-learning-bg)] text-[var(--badge-learning-fg)] border-[var(--badge-learning-border)] hover:border-[var(--badge-learning-fg)]/50"
                    : "bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                }`}
              >
                {isCore && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)] shrink-0" />
                )}
                <span>{skill.name}</span>
                {skill.level && (
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-semibold ${
                      isSelected
                        ? "bg-black/20 text-[var(--accent-lime-fg)] font-bold"
                        : isCore
                        ? "bg-[var(--accent-lime)] text-[var(--accent-lime-fg)] font-bold"
                        : isLearning
                        ? "bg-[var(--badge-learning-fg)]/15 text-[var(--badge-learning-fg)]"
                        : "text-[var(--text-tertiary)] bg-[var(--bg-surface-subtle)]"
                    }`}
                  >
                    {skill.level}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export function SkillsSection({ categories }: SkillsSectionProps) {
  // Resolve CMS skills with authoritative project references and evidence tiers
  const allResolvedTechnologies = useMemo(
    () => getResolvedTechnologies(categories),
    [categories]
  );

  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
  const [selectedTechId, setSelectedTechId] = useState<string | null>("typescript");

  // Strict synchronized technology derivation:
  // When activeCategoryId is not "all", selectedTech is guaranteed to belong to activeCategoryId
  const selectedTech = useMemo(() => {
    if (!selectedTechId) return null;
    const tech = allResolvedTechnologies.find((t) => t.id === selectedTechId) || null;
    if (!tech) return null;

    if (activeCategoryId !== "all" && tech.categoryId !== activeCategoryId) {
      // Fallback: automatically pick the first skill belonging to the active category
      return (
        allResolvedTechnologies.find((t) => t.categoryId === activeCategoryId) || null
      );
    }
    return tech;
  }, [allResolvedTechnologies, selectedTechId, activeCategoryId]);

  // Synchronized category switching handler
  const handleCategoryChange = (newCategoryId: string) => {
    setActiveCategoryId(newCategoryId);

    if (newCategoryId !== "all") {
      // Check if current selected tech already belongs to the newly selected category
      const currentBelongs = allResolvedTechnologies.some(
        (t) => t.id === selectedTechId && t.categoryId === newCategoryId
      );

      if (!currentBelongs) {
        // Automatically select the first skill in that category
        const firstTech = allResolvedTechnologies.find(
          (t) => t.categoryId === newCategoryId
        );
        if (firstTech) {
          setSelectedTechId(firstTech.id);
        }
      }
    }

    // Ensure newly filtered content is rendered before scrolling begins
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToTarget("#technology-details", {
          offset: 80,
          duration: 0.9,
          ease: "power2.inOut",
          updateHash: false,
        });
      });
    });
  };

  // Synchronized related technology selection handler
  const handleSelectRelatedByName = (techName: string) => {
    const found = allResolvedTechnologies.find(
      (t) => t.name.toLowerCase() === techName.toLowerCase()
    );
    if (found) {
      setSelectedTechId(found.id);
      // If currently filtered by category and related tech belongs to another category, switch category too
      if (activeCategoryId !== "all" && found.categoryId !== activeCategoryId) {
        setActiveCategoryId(found.categoryId);
      }
    }
  };

  // Categories to display based on active filter
  const displayedCategories = useMemo(() => {
    if (activeCategoryId === "all") {
      return categories;
    }
    return categories.filter((cat) => cat.id === activeCategoryId);
  }, [categories, activeCategoryId]);

  // Category filter options
  const categoryFilters = useMemo(() => {
    return [
      { id: "all", title: "All Categories", count: allResolvedTechnologies.length },
      ...categories.map((c) => ({
        id: c.id,
        title: CATEGORY_SHORT_TITLES[c.id] || c.title.split(" ")[0],
        count: c.skills.length,
      })),
    ];
  }, [categories, allResolvedTechnologies]);

  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const activeFilter =
    categoryFilters.find((f) => f.id === activeCategoryId) || categoryFilters[0];

  const bottomSheetOptions: BottomSheetOption[] = useMemo(() => {
    return categoryFilters.map((f) => ({
      id: f.id,
      label: f.title,
      count: f.count,
    }));
  }, [categoryFilters]);

  return (
    <section id="skills" className="py-20 border-b border-[var(--border-subtle)]">
      <Container>
        <SectionHeading
          badge="MY TECHNICAL TOOLKIT"
          number="02"
          title="Skills & Engineering Proficiencies"
          description="Honest breakdown of technical proficiencies across frontend engineering, backend architectures, databases, cloud infrastructure, and computer science fundamentals."
        />

        {/* Mobile Filter Trigger (Below sm) */}
        <div className="sm:hidden mb-6">
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(true)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent-lime)] transition-colors cursor-pointer shadow-xs min-h-[48px]"
            aria-label="Filter skills by category"
            aria-haspopup="dialog"
            aria-expanded={isFilterSheetOpen}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <Filter className="w-4 h-4 text-[var(--accent-lime)] shrink-0" />
              <span className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider shrink-0">
                Category:
              </span>
              <span className="font-bold text-xs text-[var(--text-primary)] truncate">
                {activeFilter.title}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] shrink-0">
                {activeFilter.count}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />
          </button>
        </div>

        {/* Desktop Category Filter Navigation (sm and Above) */}
        <div className="hidden sm:block w-full mb-8 border-b border-[var(--border-subtle)]">
          <div className="w-full flex items-center gap-2.5 pb-2 sm:flex-wrap">
            {categoryFilters.map((filter) => {
              const isActive = activeCategoryId === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => handleCategoryChange(filter.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono shrink-0 whitespace-nowrap cursor-pointer transition-all border ${
                    isActive
                      ? "bg-[var(--accent-lime)] text-[var(--accent-lime-fg)] border-[var(--accent-lime)] font-bold shadow-xs shadow-[0_0_12px_rgba(163,230,53,0.25)]"
                      : "bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <span>{filter.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-black/15 text-[var(--accent-lime-fg)] font-semibold"
                        : "bg-[var(--bg-surface-subtle)] text-[var(--text-tertiary)]"
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Bottom Sheet Filter Dialog */}
        <BottomSheet
          isOpen={isFilterSheetOpen}
          onClose={() => setIsFilterSheetOpen(false)}
          title="Select Skill Category"
          description="Filter proficiencies by engineering domain"
          options={bottomSheetOptions}
          selectedId={activeCategoryId}
          onSelect={(id) => handleCategoryChange(id)}
        />

        {/* Dynamic Layout: All Categories (3-Col Grid) vs Single Category (Side-by-Side 42% / 58%) */}
        {activeCategoryId === "all" ? (
          <>
            {/* 9 Category Cards Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
              {displayedCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  selectedTechId={selectedTech?.id || null}
                  onSelectTech={setSelectedTechId}
                  allResolvedTechnologies={allResolvedTechnologies}
                  isSideBySide={false}
                />
              ))}
            </div>

            {/* Full-Width Selected Technology Detail Panel Beneath Grid */}
            <div className="mt-8" id="technology-analysis">
              <TechnologyInfoPanel
                selectedTech={selectedTech}
                onSelectRelated={handleSelectRelatedByName}
                onClose={() => setSelectedTechId(null)}
                isSideBySide={false}
              />
            </div>
          </>
        ) : (
          /* Two-Column Side-by-Side Layout for Specific Category: 42% Card (Left) + 58% Analysis (Right) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Category Card (~42% on desktop) */}
            <div className="lg:col-span-5 w-full">
              {displayedCategories[0] && (
                <CategoryCard
                  category={displayedCategories[0]}
                  selectedTechId={selectedTech?.id || null}
                  onSelectTech={setSelectedTechId}
                  allResolvedTechnologies={allResolvedTechnologies}
                  isSideBySide={true}
                />
              )}
            </div>

            {/* Right Column: Technology Analysis Panel (~58% on desktop) */}
            <div className="lg:col-span-7 w-full" id="technology-analysis">
              <TechnologyInfoPanel
                selectedTech={selectedTech}
                onSelectRelated={handleSelectRelatedByName}
                onClose={() => setSelectedTechId(null)}
                isSideBySide={true}
              />
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between text-xs font-mono text-[var(--text-tertiary)] gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-lime)] shrink-0" />
              <span className="text-[var(--text-primary)] font-medium">Core:</span>
              <span>Daily production focus</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-secondary)] shrink-0" />
              <span className="text-[var(--text-primary)] font-medium">Proficient:</span>
              <span>Shipped in production systems</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-tertiary)] shrink-0" />
              <span className="text-[var(--text-primary)] font-medium">Familiar:</span>
              <span>Academic & independent depth</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--badge-learning-fg)] shrink-0" />
              <span className="text-[var(--badge-learning-fg)] font-medium">Learning:</span>
              <span>Active technical exploration</span>
            </span>
          </div>

          <div className="text-[11px] text-[var(--text-tertiary)]">
            50 Technical Proficiencies &bull; Full-Stack Taxonomy &bull; Truthful Evidence Model
          </div>
        </div>
      </Container>
    </section>
  );
}
