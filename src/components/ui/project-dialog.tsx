"use client"

import type React from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Project } from "@/types"
import { useRef, useState } from "react"
import { GalleryDialog } from "@/components/ui/gallery-dialog"
import { useTheme } from "next-themes"

interface ProjectDialogProps {
  project: Project
  children: React.ReactNode
}

export function ProjectDialog({ project, children }: ProjectDialogProps) {
  const { resolvedTheme } = useTheme()
  const cardTheme = resolvedTheme === "dark" ? "vue-dark" : "vue"
  const [isGitHubCardLoading, setIsGitHubCardLoading] = useState(true)

  const getGitHubRepoInfo = (githubUrl: string) => {
    try {
      const url = new URL(githubUrl)
      if (url.hostname === "github.com") {
        const pathParts = url.pathname.split("/").filter(Boolean)
        if (pathParts.length >= 2) {
          return {
            username: pathParts[0],
            repo: pathParts[1],
          }
        }
      }
    } catch (error) {
      console.error("Error parsing GitHub URL:", error)
    }
    return null
  }

  const renderPlayButton = () => {
    if (!project.links.play) return null

    if (project.links.play === "Coming Soon") {
      return (
        <Button variant="outline" disabled className="cursor-not-allowed w-fit p-0 h-9">
          <Image
            src="https://img.shields.io/badge/Coming Soon-333333?style=flat&logo=googleplay"
            alt="Google Play"
            width={90}
            height={36}
            className="h-full w-auto"
          />
        </Button>
      )
    }

    return (
      <Button variant="outline" asChild className="w-fit p-0 h-9">
        <a href={project.links.play} target="_blank" rel="noopener noreferrer" aria-label="Google Play">
          <Image
            src="https://img.shields.io/badge/-333333?style=social&logo=googleplay"
            alt="Google Play"
            width={90}
            height={36}
            className="h-full w-auto"
          />
        </a>
      </Button>
    )
  }
  const renderDemoButton = () => {
    if (!project.links.demo) return null

    return (
      <Button variant="outline" asChild className="w-fit p-0 h-9">
        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
          <Image
            src="https://img.shields.io/badge/Demo-FFFFFF?style=for-the-badge&logoColor=000"
            alt="Live Demo"
            width={90}
            height={36}
            className="h-full w-auto"
          />
        </a>
      </Button>
    )
  }

  const repoInfo = project.links.github ? getGitHubRepoInfo(project.links.github) : null

  const GitHubCardSkeleton = () => (
    <div className="w-full sm:w-[250px] h-[120px] rounded-md bg-neutral-200 dark:bg-neutral-700 animate-pulse flex flex-col p-3">
      <div className="flex items-center mb-3">
        <div className="w-6 h-6 rounded-full bg-neutral-300 dark:bg-neutral-600 mr-2"></div>
        <div className="h-3 bg-neutral-300 dark:bg-neutral-600 rounded w-1/3"></div>
      </div>
      <div className="h-2 bg-neutral-300 dark:bg-neutral-600 rounded w-3/4 mb-2"></div>
      <div className="h-2 bg-neutral-300 dark:bg-neutral-600 rounded w-1/2 mb-3"></div>
      <div className="flex justify-between mt-auto">
        <div className="h-2 bg-neutral-300 dark:bg-neutral-600 rounded w-1/4"></div>
        <div className="h-2 bg-neutral-300 dark:bg-neutral-600 rounded w-1/4"></div>
        <div className="h-2 bg-neutral-300 dark:bg-neutral-600 rounded w-1/4"></div>
      </div>
    </div>
  )

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-screen-md max-h-[90vh] overflow-hidden flex flex-col">
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
        <div className="flex-grow relative z-0 grid auto-rows-min grid-flow-row gap-y-6 overflow-y-auto px-4 py-[calc(10vh-clamp(1rem,4vmin,2rem)/2-3px)] max-h-[70vh] scrollbar-hide">
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

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              {repoInfo && (
                <div className="flex-shrink-0 w-full sm:w-auto relative">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90 transition-opacity block w-full sm:w-auto"
                  >
                    <div className={isGitHubCardLoading ? "block" : "hidden"}>
                      <GitHubCardSkeleton />
                    </div>
                    <div className={isGitHubCardLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
                      <img
                        src={`https://github-readme-stats.vercel.app/api/pin/?username=${repoInfo.username}&repo=${repoInfo.repo}&theme=${cardTheme}`}
                        alt={`${project.title} GitHub repository stats`}
                        width={250}
                        height={120}
                        className="rounded-md shadow-md w-full sm:w-auto"
                        onLoad={() => setIsGitHubCardLoading(false)}
                        onError={() => setIsGitHubCardLoading(false)}
                      />
                    </div>
                  </a>
                </div>
              )}

              <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
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
                    <a href={project.links.docs} target="_blank" rel="noopener noreferrer" aria-label="Project Website">
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
                {renderDemoButton()}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {project.gallery.map((image, index) => (
                  <GalleryDialog key={index} images={project.gallery} title={project.title} initialIndex={index}>
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-900 cursor-pointer">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full opacity-90 transition-opacity duration-300 hover:opacity-100"
                      />
                    </div>
                  </GalleryDialog>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

