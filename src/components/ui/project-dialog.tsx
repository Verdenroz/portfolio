import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Project } from "@/types";
import { useRef } from "react";
import { GalleryDialog } from "@/components/ui/gallery-dialog";

interface ProjectDialogProps {
  project: Project;
  children: React.ReactNode;
}

export function ProjectDialog({ project, children }: ProjectDialogProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  const renderPlayButton = () => {
    if (!project.links.play) return null;

    if (project.links.play === "Coming Soon") {
      return (
        <Button
          variant="outline"
          disabled
          className="cursor-not-allowed w-fit p-0 h-9"
        >
          <Image
            src="https://img.shields.io/badge/Coming Soon-333333?style=flat&logo=googleplay"
            alt="Google Play"
            width={90}
            height={36}
            className="h-full w-auto"
          />
        </Button>
      );
    }

    return (
      <Button variant="outline" asChild className="w-fit p-0 h-9">
        <a
          href={project.links.play}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Play"
        >
          <Image
            src="https://img.shields.io/badge/-333333?style=social&logo=googleplay"
            alt="Google Play"
            width={90}
            height={36}
            className="h-full w-auto"
          />
        </a>
      </Button>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>
            {project.date === "Present"
              ? "Present"
              : new Date(project.date).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <img
                key={skill.slug}
                src={`https://img.shields.io/badge/${skill.name}-333333?style=flat&logo=${skill.slug}`}
                alt={skill.name}
                aria-label={skill.name}
                title={skill.name}
                className="h-6"
              />
            ))}
          </div>
          <p className="text-pretty text-sm lg:text-base text-secondary-foreground tracking-wide mx-auto py-2 sm:py-4">
            {project.longDescription}
          </p>
          <div className="flex gap-2">
            {project.links.github && (
              <Button variant="outline" asChild className="w-fit p-0 h-9">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <Image
                    src="https://img.shields.io/badge/-333333?style=social&logo=github"
                    alt="GitHub"
                    width={90}
                    height={36}
                    className="h-full w-auto"
                  />
                </a>
              </Button>
            )}
            {project.links.docs && (
              <Button variant="outline" asChild className="w-fit p-0 h-9">
                <a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Project Website"
                >
                  <Image
                    src="https://img.shields.io/badge/-333333?style=social&logo=swagger"
                    alt="Website"
                    width={90}
                    height={36}
                    className="h-full w-auto"
                  />
                </a>
              </Button>
            )}
            {renderPlayButton()}
          </div>
          <div className="relative">
            <div
              ref={galleryRef}
              className="relative z-10 grid auto-cols-[minmax(0,400px)] grid-flow-col gap-x-4 overflow-x-auto pb-4 pt-4 scrollbar-hide"
            >
              {project.gallery.map((image, index) => (
                <GalleryDialog
                  key={index}
                  images={project.gallery}
                  title={project.title}
                  initialIndex={index}
                >
                  <button className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-900">
                    <div className="group relative h-full w-full">
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={1920}
                        height={1080}
                        className="h-full w-full object-cover opacity-90 transition-[transform,opacity] duration-700 group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-neutral-900/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </button>
                </GalleryDialog>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}