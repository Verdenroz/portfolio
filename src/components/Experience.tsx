"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Experience as WorkExperience } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

const experiences: WorkExperience[] = [
  {
    company: "Farmingdale State College",
    position: "Math Tutor",
    timeframe: "September 2023 - Present",
    description:
      "Improved student comprehension in advanced mathematics through personalized instruction and custom study materials.",
    technologies: ["Statistics", "Calculus", "Linear Algebra"],
  },
  {
    company: "The Commons XR",
    position: "Full Stack Developer Intern",
    timeframe: "September 2024 - January 2025",
    description:
      "Collaborated with UI and Data Analytics teams to build data visualization pipelines in React and Python, enabling clear and interactive analytics displays.",
    technologies: ["React", "Material-UI", "Azure", "Python", "SQL"],
  },
  {
    company: "Mobalytics",
    position: "Remote Extern",
    timeframe: "May 2024 - June 2024",
    description:
      "Delivered competitive market insights, emerging as 1 of 4 final presenters from a 412-member cohort. Identified strategic growth opportunities in the gaming industry through thorough market research.",
    technologies: ["Market Research", "Data Analysis", "Competitive Analysis"],
  },
];

export default function Experience() {
  const [selectedCompany, setSelectedCompany] = useState(
    experiences[0].company
  );
  const isMobile = useIsMobile();

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Experience
        </h2>

        <div
          className={cn(
            "grid gap-8",
            isMobile ? "grid-cols-1" : "md:grid-cols-[1fr,2fr]"
          )}
        >
          {/* Company list */}
          <div
            className={cn(
              "space-y-2",
              isMobile && "flex overflow-x-auto pb-4 mb-4 scrollbar-hide"
            )}
            role="tablist"
            aria-label="Work experience"
          >
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className={cn(
                  "transition-all duration-300",
                  !isMobile && selectedCompany === exp.company
                    ? "translate-x-2"
                    : "",
                  isMobile && "flex-shrink-0"
                )}
              >
                <button
                  onClick={() => setSelectedCompany(exp.company)}
                  className={cn(
                    "text-left px-4 py-3 rounded-lg transition-colors",
                    "hover:bg-primary hover:text-primary-foreground hover:opacity-65",
                    selectedCompany === exp.company
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground",
                    isMobile ? "w-auto" : "w-full"
                  )}
                  role="tab"
                  aria-selected={selectedCompany === exp.company}
                  aria-controls={`panel-${exp.company
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  id={`tab-${exp.company.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <div className="font-semibold text-lg">{exp.company}</div>
                  <div className="text-sm opacity-90">{exp.timeframe}</div>
                </button>
              </div>
            ))}
          </div>

          {/* Experience details */}
          <div className={cn("relative", isMobile && "mt-4")}>
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className={cn(
                  "transition-all duration-300",
                  !isMobile && "absolute top-0 left-0 w-full",
                  selectedCompany === exp.company
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4 pointer-events-none",
                  isMobile && selectedCompany !== exp.company && "hidden"
                )}
                role="tabpanel"
                id={`panel-${exp.company.replace(/\s+/g, "-").toLowerCase()}`}
                aria-labelledby={`tab-${exp.company
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                tabIndex={selectedCompany === exp.company ? 0 : -1}
                hidden={selectedCompany !== exp.company}
              >
                <div className="bg-card rounded-lg p-6 shadow-lg border h-64 overflow-y-auto scrollbar-hide">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {exp.position}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {exp.timeframe}
                  </p>
                  <div className="prose prose-sm dark:prose-invert">
                    <p className="mb-4 text-foreground">{exp.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-foreground">
                      {exp.technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
