"use client";

import React from "react";
import Image from "next/image";
import { Button, GalleryDialog, ProjectEdgeNavigation, ProjectBadge, ZoomIn, GitBranch, ExternalLink, BookOpen, Play } from "@/components/ui";
import type { Project } from "@/types";
import { Header } from "@/components/layout";
import { SkillIconWithFallback } from "@/components/ui";
import { formatProjectDateRange, getProjectStartDateISO } from "@/lib/projects";

interface ProjectPageClientProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

export default function ProjectPageClient({ project, prev, next }: ProjectPageClientProps) {
  return (
    <main className="min-h-screen bg-background" role="main">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative mx-auto px-8 md:px-16 lg:px-24 max-w-5xl">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 text-center">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold 
                               bg-gradient-to-br from-primary via-primary to-primary/80 
                               bg-clip-text text-transparent leading-[1.1] tracking-tight mb-6">
                  {project.title}
                </h1>
                <time
                  dateTime={getProjectStartDateISO(project.date)}
                  className="inline-flex items-center gap-2 text-base font-medium 
                                text-muted-foreground bg-secondary/50 px-3 py-1.5 
                                rounded-full border mb-6">
                  {formatProjectDateRange(project.date)}
                </time>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {project.skills.map((skill) => (
                  <span
                    key={skill.slug}
                    className="inline-flex items-center gap-2 px-3 py-1.5 
                               bg-gradient-to-r from-primary/10 to-primary/5 
                               hover:from-primary/20 hover:to-primary/10
                               border border-primary/20 hover:border-primary/30
                               rounded-full text-sm font-medium 
                               transition-all duration-200 hover:scale-105
                               group cursor-default"
                    title={skill.name}
                  >
                    <SkillIconWithFallback
                      skillName={skill.name}
                      width={16}
                      height={16}
                      className="object-contain group-hover:scale-110 transition-transform"
                    />
                    {skill.name}
                  </span>
                ))}
              </div>

              {project.badges && project.badges.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center">
                  {project.badges.map((badge, index) => (
                    <ProjectBadge
                      key={index}
                      src={badge}
                      alt={`Project badge ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 justify-center">
                {project.links.github && (
                  <Button
                    variant="default"
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-primary to-primary/90 
                               hover:from-primary/90 hover:to-primary/80
                               shadow-lg hover:shadow-xl transition-all duration-200
                               hover:scale-105 active:scale-95
                               focus-visible:ring-2 focus-visible:ring-primary 
                               focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View source code on GitHub"
                    >
                      <GitBranch className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.links.pypi && (
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-2 hover:bg-primary hover:text-primary-foreground
                               transition-all duration-200 hover:scale-105 active:scale-95
                               focus-visible:ring-2 focus-visible:ring-primary 
                               focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <a href={project.links.pypi} target="_blank" rel="noopener noreferrer" aria-label="View package on PyPI">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      PyPI Package
                    </a>
                  </Button>
                )}
                {project.links.demo && (
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-2 hover:bg-primary hover:text-primary-foreground
                               transition-all duration-200 hover:scale-105 active:scale-95
                               focus-visible:ring-2 focus-visible:ring-primary 
                               focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" aria-label="View live demo">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.links.docs && (
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-2 hover:bg-primary hover:text-primary-foreground
                               transition-all duration-200 hover:scale-105 active:scale-95
                               focus-visible:ring-2 focus-visible:ring-primary 
                               focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <a href={project.links.docs} target="_blank" rel="noopener noreferrer" aria-label="View project documentation">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Documentation
                    </a>
                  </Button>
                )}
                {project.links.play && (
                  <Button
                    variant="outline"
                    size="lg"
                    disabled={project.links.play === "Coming Soon"}
                    asChild={project.links.play !== "Coming Soon"}
                    className={`border-2 transition-all duration-200 
                               focus-visible:ring-2 focus-visible:ring-primary 
                               focus-visible:ring-offset-2 focus-visible:outline-none
                               ${project.links.play === "Coming Soon" 
                                 ? "cursor-not-allowed opacity-60" 
                                 : "hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95"}`}
                  >
                    {project.links.play === "Coming Soon" ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Coming Soon
                      </>
                    ) : (
                      <a href={project.links.play} target="_blank" rel="noopener noreferrer" aria-label="Download from Google Play Store">
                        <Play className="h-4 w-4 mr-2" />
                        Google Play
                      </a>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="relative mx-auto px-8 md:px-16 lg:px-24 max-w-4xl">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <section aria-labelledby="project-gallery">
                <h2 id="project-gallery" className="text-3xl font-bold mb-8 text-center">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.gallery.map((image, index) => (
                    <GalleryDialog key={index} images={project.gallery} title={project.title} initialIndex={index}>
                      <div className="group relative aspect-video w-full overflow-hidden 
                                      rounded-xl bg-neutral-900 cursor-pointer
                                      ring-1 ring-border hover:ring-primary/50
                                      transition-all duration-300 hover:shadow-lg">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} screenshot ${index + 1}`}
                          width={400}
                          height={300}
                          className="object-cover w-full h-full transition-all duration-500
                                     group-hover:scale-110"
                        />
                        {/* Hover overlay with zoom icon */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 
                                        group-hover:opacity-100 transition-opacity duration-300
                                        flex items-center justify-center">
                          <ZoomIn className="h-8 w-8 text-white" />
                        </div>
                        {/* Image counter */}
                        <div className="absolute top-2 right-2 bg-black/60 text-white 
                                        px-2 py-1 rounded text-sm font-medium
                                        opacity-0 group-hover:opacity-100 transition-opacity">
                          {index + 1} / {project.gallery.length}
                        </div>
                      </div>
                    </GalleryDialog>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>

      {/* Edge Navigation */}
      <ProjectEdgeNavigation prev={prev} next={next} />
    </main>
  );
}