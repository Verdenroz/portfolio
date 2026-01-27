"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, ZoomIn, GitBranch, ExternalLink, BookOpen, Play, Dialog, DialogTrigger, DialogTitle, DialogDescription, DialogPortal, DialogOverlay, ChevronLeft, ChevronRight, X, SkillBadge, ArrowLeft, ArrowRight } from "@/components/ui";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { Project } from "@/types";
import { Header } from "@/components/layout";
import { createSlug, formatProjectDateRange, getProjectStartDateISO } from "@/lib/projects";
import { getBlurPlaceholder } from "@/lib/blur-placeholder";

/**
 * Full-screen gallery dialog with image navigation
 */
function GalleryDialog({
  images,
  title,
  initialIndex,
  children
}: {
  images: string[];
  title: string;
  initialIndex: number;
  children: React.ReactNode;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-none w-screen h-screen p-0 border-none bg-black z-50 m-0 fixed"
          onClick={() => setOpen(false)}
        >
          <DialogTitle className="sr-only">
            {title} - Image {currentIndex + 1} of {images.length}
          </DialogTitle>

          <DialogDescription className="sr-only">
            Gallery view of {title} project. Navigate using left and right buttons or swipe.
          </DialogDescription>

          <Button
            variant="secondary"
            size="icon"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-[60] h-8 w-8 rounded-full
              bg-black/60 hover:bg-black/80 border border-white/30 hover:border-white/50
              text-white shadow-md hover:shadow-lg"
            aria-label="Close gallery"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full flex-grow flex items-center justify-center p-2 sm:p-4 pt-10 sm:pt-4">
              <div className="w-full bg-black/20 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={images[currentIndex] || "/placeholder.svg"}
                    alt={`${title} image ${currentIndex + 1} of {images.length}`}
                    width={1600}
                    height={1200}
                    className="max-w-[80%] max-h-[70vh] sm:max-h-[80vh] w-auto h-auto object-contain"
                    onClick={(e) => e.stopPropagation()}
                    placeholder="blur"
                    blurDataURL={getBlurPlaceholder()}
                  />
                </div>
              </div>

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full
                      bg-black/60 hover:bg-black/80 border border-white/30 hover:border-white/50
                      opacity-70 sm:opacity-80 transition-opacity group-hover:opacity-100 shadow-md hover:shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-7 w-7 text-white drop-shadow-sm" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full
                      bg-black/60 hover:bg-black/80 border border-white/30 hover:border-white/50
                      opacity-70 sm:opacity-80 transition-opacity group-hover:opacity-100 shadow-md hover:shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </Button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="w-full flex justify-center py-5 mb-3">
                <div className="flex gap-1.5 z-40">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

/**
 * Project-specific badge component
 */
function Badge({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={120}
      height={24}
      className="h-6 w-auto hover:scale-105 transition-transform"
      onError={() => setError(true)}
      unoptimized
    />
  );
}

/**
 * Mobile navigation button
 */
function MobileNavButton({
  project,
  direction,
}: {
  project: Project;
  direction: 'prev' | 'next';
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const label = direction === 'prev' ? 'Previous' : 'Next';

  return (
    <Button
      asChild
      size="lg"
      className="pointer-events-auto h-14 w-14 rounded-full bg-background/80 backdrop-blur-lg
        border border-border/50 shadow-lg hover:shadow-xl text-foreground hover:bg-primary
        hover:text-primary-foreground transition-all duration-300"
    >
      <Link href={`/projects/${createSlug(project.title)}`} aria-label={`${label} project: ${project.title}`}>
        <Icon className="h-6 w-6" />
      </Link>
    </Button>
  );
}

/**
 * Navigation info card
 */
function NavCard({
  project,
  direction,
}: {
  project: Project;
  direction: 'prev' | 'next';
}) {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? ArrowLeft : ArrowRight;
  const label = isPrev ? 'Previous Project' : 'Next Project';
  const positionClass = isPrev ? 'left-20' : 'right-20';
  const slideClass = isPrev ? 'motion-preset-slide-right' : 'motion-preset-slide-left';
  const alignClass = isPrev ? '' : 'text-right';
  const flexClass = isPrev ? 'flex items-center gap-3 mb-6' : 'flex items-center justify-end gap-3 mb-6';

  return (
    <div className={`fixed ${positionClass} top-1/2 -translate-y-1/2 w-80 z-50 ${slideClass} motion-duration-300`}>
      <Link
        href={`/projects/${createSlug(project.title)}`}
        className="block group"
        aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} project: ${project.title}`}
      >
        <div className="bg-background/20 backdrop-blur-md border border-white/20 rounded-2xl p-8
          shadow-2xl hover:shadow-3xl hover:border-white/30 hover:bg-background/30 transition-all duration-300">
          <div className={flexClass}>
            {isPrev && <Icon className="h-6 w-6 text-white group-hover:text-primary transition-colors" />}
            <span className="text-sm font-medium text-white/80">{label}</span>
            {!isPrev && <Icon className="h-6 w-6 text-white group-hover:text-primary transition-colors" />}
          </div>

          <div className={`space-y-4 ${alignClass}`}>
            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
              {project.title}
            </h3>

            <p className="text-base text-white/90 line-clamp-4 leading-relaxed">
              {project.description}
            </p>

            <div className="pt-2">
              <span className="text-sm text-white/70 font-medium">
                {isPrev ? 'Click to explore →' : '← Click to explore'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * Desktop edge trigger with background preview
 */
function EdgeTrigger({
  project,
  direction,
  isHovered,
  onHoverChange,
}: {
  project: Project;
  direction: 'prev' | 'next';
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const isPrev = direction === 'prev';
  const sideClass = isPrev ? 'left-4' : 'right-4';
  const clipPath = isPrev ? 'circle(480px at 0% 50%)' : 'circle(480px at 100% 50%)';
  const gradientClass = isPrev
    ? 'bg-gradient-to-r from-black/60 via-black/40 to-black/20'
    : 'bg-gradient-to-l from-black/60 via-black/40 to-black/20';

  return (
    <div className={`fixed ${sideClass} top-0 h-screen w-96 pointer-events-auto`}>
      <div
        className="h-full w-full"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
      >
        {isHovered && (
          <>
            {/* Background image */}
            <Link
              href={`/projects/${createSlug(project.title)}`}
              className={`fixed ${sideClass} top-0 h-screen w-96 cursor-pointer motion-preset-fade motion-duration-200`}
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                clipPath,
              }}
              aria-label={`Navigate to ${direction === 'prev' ? 'previous' : 'next'} project: ${project.title}`}
            />

            {/* Gradient overlay */}
            <div
              className={`fixed ${sideClass} top-0 h-screen w-96 ${gradientClass} backdrop-blur-sm pointer-events-none motion-preset-fade motion-duration-200`}
              style={{ clipPath }}
            />

            {/* Info card */}
            <NavCard project={project} direction={direction} />
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Project edge navigation with hover previews and keyboard support
 */
function EdgeNavigation({ prev, next }: { prev: Project | null; next: Project | null }) {
  const router = useRouter();
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/no-hover devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || !window.matchMedia('(hover: hover)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Debounced hover handler
  const createHoverHandler = useCallback((setter: (value: boolean) => void) => {
    return (hovered: boolean) => {
      if (isMobile) return;

      if (hovered) {
        setter(true);
      } else {
        setTimeout(() => setter(false), 100);
      }
    };
  }, [isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault();
        router.push(`/projects/${createSlug(prev.title)}`);
      } else if (e.key === 'ArrowRight' && next) {
        e.preventDefault();
        router.push(`/projects/${createSlug(next.title)}`);
      } else if (e.key === 'Escape') {
        setIsLeftHovered(false);
        setIsRightHovered(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next, router]);

  if (!prev && !next) return null;

  // Mobile: floating action buttons
  if (isMobile) {
    return (
      <div className="fixed bottom-6 left-0 right-0 z-50 pointer-events-none">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {prev && <MobileNavButton project={prev} direction="prev" />}
            {next && <MobileNavButton project={next} direction="next" />}
          </div>
        </div>
      </div>
    );
  }

  // Desktop: edge hover navigation
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {prev && (
        <EdgeTrigger
          project={prev}
          direction="prev"
          isHovered={isLeftHovered}
          onHoverChange={createHoverHandler(setIsLeftHovered)}
        />
      )}

      {next && (
        <EdgeTrigger
          project={next}
          direction="next"
          isHovered={isRightHovered}
          onHoverChange={createHoverHandler(setIsRightHovered)}
        />
      )}

      {/* Screen reader hint */}
      <div className="sr-only" role="region" aria-label="Project navigation">
        Use left and right arrow keys to navigate between projects.
        {prev && ` Previous: ${prev.title}.`}
        {next && ` Next: ${next.title}.`}
      </div>
    </div>
  );
}

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
        {/* Dynamic radial gradient burst using project color */}
        {project.color && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${project.color}60, transparent 70%)`
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative mx-auto px-8 md:px-16 lg:px-24 max-w-5xl">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 text-center">
              <div>
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold
                    bg-clip-text text-transparent leading-[1.2] tracking-tight mb-4 pb-2"
                  style={{
                    backgroundImage: project.color
                      ? `linear-gradient(to bottom right, ${project.color}, ${project.color}CC, ${project.color}99)`
                      : 'linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary) / 0.8))'
                  }}
                >
                  {project.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex items-center gap-3 justify-center flex-wrap">
                  <time
                    dateTime={getProjectStartDateISO(project.date)}
                    className="inline-flex items-center gap-2 text-base font-medium
                      text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border">
                    {formatProjectDateRange(project.date)}
                  </time>
                  {project.status && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${
                        project.status === "Active"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : project.status === "Stable"
                          ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          : project.status === "Maintained"
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          project.status === "Active"
                            ? "bg-green-500 animate-pulse"
                            : project.status === "Stable"
                            ? "bg-blue-500"
                            : project.status === "Maintained"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                      />
                      {project.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {project.skills.map((skill) => (
                  <SkillBadge
                    key={skill.slug}
                    skillName={skill.name}
                    skillSlug={skill.slug}
                    width={80}
                    height={24}
                    className="h-6 w-auto hover:scale-105 transition-transform"
                  />
                ))}
              </div>

              {/* Badges */}
              {project.badges && project.badges.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center">
                  {project.badges.map((badge, index) => (
                    <Badge key={index} src={badge} alt={`Project badge ${index + 1}`} />
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                {project.links.github && (
                  <Button
                    variant="default"
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-primary to-primary/90
                      hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl
                      transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub">
                      <GitBranch className="h-4 w-4 mr-2" />
                      Repository
                    </a>
                  </Button>
                )}
                {project.links.pypi && (
                  <Button variant="outline" size="lg" asChild className="border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 active:scale-95">
                    <a href={project.links.pypi} target="_blank" rel="noopener noreferrer" aria-label="View package on PyPI">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      PyPI Package
                    </a>
                  </Button>
                )}
                {project.links.demo && (
                  <Button variant="outline" size="lg" asChild className="border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 active:scale-95">
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" aria-label="View live demo">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.links.docs && (
                  <Button variant="outline" size="lg" asChild className="border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 active:scale-95">
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
                    className={`border-2 transition-all duration-200 ${
                      project.links.play === "Coming Soon"
                        ? "cursor-not-allowed opacity-60"
                        : "hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95"
                    }`}
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
      {project.gallery.length > 0 && (
        <section className="py-16 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="relative mx-auto px-8 md:px-16 lg:px-24 max-w-4xl">
            <div className="max-w-4xl mx-auto space-y-16">
              <section aria-labelledby="project-gallery">
                <h2 id="project-gallery" className="text-3xl font-bold mb-8 text-center">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.gallery.map((image, index) => (
                    <GalleryDialog key={index} images={project.gallery} title={project.title} initialIndex={index}>
                      <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900
                        cursor-pointer ring-1 ring-border hover:ring-primary/50 transition-all duration-300 hover:shadow-lg">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} screenshot ${index + 1}`}
                          width={400}
                          height={300}
                          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                          placeholder="blur"
                          blurDataURL={getBlurPlaceholder()}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
                          transition-opacity duration-300 flex items-center justify-center">
                          <ZoomIn className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded
                          text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {index + 1} / {project.gallery.length}
                        </div>
                      </div>
                    </GalleryDialog>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      )}

      <EdgeNavigation prev={prev} next={next} />
    </main>
  );
}
