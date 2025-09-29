"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel, SkillBadgeWithFallback } from "@/components/ui";
import { projectsData } from "@/config/projects";
import { createSlug } from "@/lib/projects";


export default function ProjectCarousel() {
  return (
    <section id="projects" className="relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Projects
      </h2>

      <Carousel
        id="project-carousel"
        scrollAmount={400}
        gap="gap-x-6"
        padding="px-24"
        ariaLabel="Project Carousel"
        as="ul"
        controlsPosition="absolute"
      >
        {projectsData.map((project) => (
          <li
            key={project.title}
            className="relative aspect-[2/3] w-[clamp(18rem,42vmin,26rem)] overflow-hidden rounded-md bg-neutral-900"
            aria-labelledby={`project-${project.title}-heading`}
          >
            <Link 
              href={`/projects/${createSlug(project.title)}`}
              className="group block h-full w-full rounded-md border border-neutral-800"
              aria-label={`View ${project.title} project details`}
            >
              <article className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-neutral-900/60 p-4 text-center transition-opacity duration-300 md:opacity-0 md:backdrop-blur-sm group-hover:opacity-100 group-focus-visible:opacity-100 z-10">
                <div className="overflow-hidden">
                  <time
                    dateTime={
                      project.date === "Present"
                        ? new Date().toISOString().split("T")[0]
                        : project.date.includes(" - Present")
                        ? project.date.split(" - Present")[0]
                        : project.date
                    }
                    className="block text-xs uppercase text-neutral-200/90 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full"
                  >
                    {(() => {
                      if (project.date === "Present") return "Present";
                      if (project.date.includes(" - Present")) {
                        const startDate = project.date.split(" - Present")[0];
                        const [year, month, day] = startDate.split("-").map(Number);
                        const date = new Date(year, month - 1, day);
                        return `${date.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })} - Present`;
                      }
                      const [year, month, day] = project.date.split("-").map(Number);
                      const date = new Date(year, month - 1, day);
                      return date.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      });
                    })()}
                  </time>
                </div>
                <div className="overflow-hidden">
                  <h3
                    id={`project-${project.title}-heading`}
                    className="text-2xl font-bold text-neutral-50 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full lg:text-4xl"
                  >
                    {project.title}
                  </h3>
                </div>
                <div className="overflow-hidden">
                  <div className="flex flex-wrap gap-2 justify-center transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full">
                    {project.skills.map((skill) => (
                      <SkillBadgeWithFallback
                        key={skill.slug}
                        skillName={skill.name}
                        skillSlug={skill.slug}
                        width={80}
                        height={24}
                        className="h-6 w-auto"
                      />
                    ))}
                  </div>
                </div>
              </article>
              <div className="absolute inset-0 bg-neutral-900">
                <Image
                  src={project.image}
                  alt={project.description}
                  className="pointer-events-auto h-full w-full object-cover transition-[transform,opacity] duration-700 group-hover:scale-105 group-hover:opacity-75 group-focus-visible:scale-105 group-focus-visible:opacity-75"
                  width={416}
                  height={624}
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 416px"
                  loading="lazy"
                />
              </div>
            </Link>
          </li>
        ))}
      </Carousel>
    </section>
  );
}
