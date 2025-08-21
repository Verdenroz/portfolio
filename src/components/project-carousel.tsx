"use client";

import Image from "next/image";
import { ProjectDialog } from "./ui/project-dialog";
import { Carousel } from "./ui/carousel";
import { projectsData } from "@/config/projects";


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
        padding="px-[calc(50vw-clamp(18rem,42vmin,26rem)/2-7px)]"
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
            <ProjectDialog project={project}>
              <button
                className="group block h-full w-full rounded-md border border-neutral-800"
                aria-label={`Show ${project.title} project details`}
              >
                <article className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-neutral-900/60 p-4 text-center transition-opacity duration-300 md:opacity-0 md:backdrop-blur-sm group-hover:opacity-100 group-focus-visible:opacity-100 z-10">
                  <div className="overflow-hidden">
                    <time
                      dateTime={
                        project.date === "Present"
                          ? new Date().toISOString().split("T")[0]
                          : new Date(project.date).toISOString().split("T")[0]
                      }
                      className="block text-xs uppercase text-neutral-200/90 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 md:translate-y-full"
                    >
                      {project.date === "Present"
                        ? "Present"
                        : new Date(project.date).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
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
                        <Image
                          key={skill.slug}
                          src={`https://img.shields.io/badge/${skill.name}-333333?style=flat&logo=${skill.slug}`}
                          alt={skill.name}
                          aria-label={skill.name}
                          title={skill.name}
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
                    width={3840}
                    height={2160}
                    sizes="(max-width: 3840px) 100vw, 3840px"
                  />
                </div>
              </button>
            </ProjectDialog>
          </li>
        ))}
      </Carousel>
    </section>
  );
}
