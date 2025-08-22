import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs, getAdjacentProjects } from "@/lib/projects";
import { Metadata } from "next";
import ProjectPageClient from "./project-page-client";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Harvey Tseng Portfolio`,
    description: project.description,
    keywords: [
      project.title,
      ...project.skills.map(skill => skill.name),
      "portfolio",
      "project",
      "development",
      "Harvey Tseng",
    ],
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      images: [
        {
          url: project.image,
          width: 800,
          height: 600,
          alt: project.description,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
    authors: [{ name: "Harvey Tseng" }],
    creator: "Harvey Tseng",
    publisher: "Harvey Tseng",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/projects/${params.slug}`,
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }
  
  const { prev, next } = getAdjacentProjects(params.slug);

  return (
    <ProjectPageClient 
      project={project} 
      prev={prev} 
      next={next} 
    />
  );
}