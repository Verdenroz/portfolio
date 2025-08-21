"use client";

import Image from "next/image";
import { ProjectDialog } from "./ui/project-dialog";
import { Carousel } from "./ui/carousel";
import { Project } from "../types";

const projects: Project[] = [
  {
    title: "VerdaxMarket",
    description:
      "A modular Android app for stock market insights using MVVM architecture.",
    longDescription:
      "VerdaxMarket is an Android app providing real-time stock market data using MVVM architecture and multi-module design. It uses Firebase for backend and Algolia for search. The app is in development and will be released on Google Play Store soon.",
    date: "Present",
    skills: [
      { name: "Kotlin", slug: "kotlin" },
      { name: "Android", slug: "android" },
      { name: "Jetpack Compose", slug: "jetpackcompose" },
      { name: "Firebase", slug: "firebase" },
      { name: "Algolia", slug: "algolia" },
    ],
    image: "/assets/verdaxmarket/verdaxmarket.webp",
    gallery: [
      "/assets/verdaxmarket/verdaxmarket.webp",
      "/assets/verdaxmarket/verdaxmarket-gallery-1.webp",
      "/assets/verdaxmarket/verdaxmarket-gallery-2.webp",
      "/assets/verdaxmarket/verdaxmarket-gallery-3.webp",
      "/assets/verdaxmarket/verdaxmarket-gallery-4.webp",
    ],
    links: {
      github: "https://github.com/verdenroz/verdax-market",
      play: "Coming Soon",
    },
  },
  {
    title: "FinanceQuery",
    description:
      "A RESTful API server providing real-time stock, market performance, and news data.",
    longDescription: "FinanceQuery is a FastAPI server handling 1000+ daily requests for real-time financial data. It uses Redis for caching and PubSub for Websockets, hosted on AWS and Render with Docker containers.",
    date: "Present",
    skills: [
      { name: "Python", slug: "python" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "Redis", slug: "redis" },
      { name: "AWS", slug: "amazonwebservices" },
      { name: "Docker", slug: "docker" },
    ],
    image: "/assets/finance-query/finance-query.webp",
    gallery: [
      "/assets/finance-query/finance-query-gallery-1.webp",
      "/assets/finance-query/finance-query-gallery-2.webp",
      "/assets/finance-query/finance-query-gallery-3.webp",
      "/assets/finance-query/finance-query-gallery-4.webp",
    ],
    links: {
      github: "https://github.com/verdenroz/finance-query",
      docs: "https://financequery.apidocumentation.com/default-page/financequery",
    },
  },  {
    title: "JobScrub",
    description:
    "An AI-enhanced platform to simplify the job search process and empower individuals to advance their careers",    longDescription:
      "JobScrub is an AI-powered job search platform that streamlines the job hunting process through intelligent filtering, community verification, and personalized career guidance. Key features include resume-to-job matching with vector embeddings (scoring matches based on skills), secure document storage with AWS S3, and an AI assistant named Scrubby powered by Google Gemini. The platform offers smart job filtering, community-based company metrics, and an intelligent resume optimization system. Built with Next.js 14, TypeScript, and Tailwind CSS for the frontend, with FastAPI and Python powering the backend, Firebase for authentication, and Pinecone for semantic vector search.",
    date: "2025-05-22",
    skills: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Python", slug: "python" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "Pinecone", slug: "pinecone" },
      { name: "Firebase", slug: "firebase" },
      { name: "Gemini", slug: "google" },
      { name: "LangChain", slug: "langchain" },
      { name: "Langgraph", slug: "langgraph" },
      { name: "HuggingFace", slug: "huggingface" },
      { name: "AWS", slug: "amazonwebservices" },
    ],
    image: "/assets/job-scrub/job-scrub.webp",
    gallery: [
      "/assets/job-scrub/job-scrub-gallery-1.webp",
      "/assets/job-scrub/job-scrub-gallery-2.webp",
      "/assets/job-scrub/job-scrub-gallery-3.webp",
      "/assets/job-scrub/job-scrub-gallery-4.webp",
    ],
    links: {
      github: "https://github.com/FSC-Senior-Project-Spring-25/job-scrub-frontend",
      demo: "https://job-scrub.vercel.app/",
    }
  },
  {
    title: "GoogleFinanceAPI",
    description:
      "A web scraper for financial data using ExpressJS, axios, and cheerio.",
    longDescription:
      "GoogleFinanceAPI is a web scraping tool extracting financial data from Google Finance using Node.js, Express, axios, and cheerio. The API is documented with Swagger and hosted with Firebase.",
    date: "2024-05-31",
    skills: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express", slug: "express" },
      { name: "Axios", slug: "axios" },
      { name: "Cheerio", slug: "cheerio" },
      { name: "Firebase", slug: "firebase" },
      { name: "Swagger", slug: "swagger" },
    ],
    image: "/assets/google-finance/google-finance.webp",
    gallery: [
      "/assets/google-finance/google-finance-gallery-1.webp",
      "/assets/google-finance/google-finance-gallery-2.webp",
      "/assets/google-finance/google-finance-gallery-3.webp",
    ],
    links: {
      github: "https://github.com/verdenroz/googlefinanceapi",
      docs: "https://gfinance-api-doc.web.app/",
    },
  },
  {
    title: "StockDiviner",
    description:
      "A desktop app for stock market predictions using unconventional indicators like lunar phases.",
    longDescription:
      "StockDiviner is a desktop app combining traditional stock market analysis with unconventional indicators like lunar phases. Developed using JavaFX and Figma wireframes, leading a team of three developers in a school project.",
    date: "2024-05-31",
    skills: [
      { name: "Java/JavaFX", slug: "openjdk" },
      { name: "Figma", slug: "figma" },
      { name: "Firebase", slug: "firebase" },
    ],
    image: "assets/stockdiviner/stockdiviner.webp",
    gallery: [
      "assets/stockdiviner/stockdiviner.webp",
      "/assets/stockdiviner/stockdiviner-gallery-1.webp",
      "/assets/stockdiviner/stockdiviner-gallery-2.webp",
    ],
    links: {
      github: "https://github.com/verdenroz/StockDiviner",
    },
  },
];

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
        {projects.map((project) => (
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
