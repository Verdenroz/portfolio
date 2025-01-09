"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { ProjectDialog } from "./ui/project-dialog";
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
    image: "/assets/verdaxmarket/verdaxmarket.png",
    gallery: [
      "/assets/verdaxmarket/verdaxmarket.png",
      "/assets/verdaxmarket/verdaxmarket-gallery-1.png",
      "/assets/verdaxmarket/verdaxmarket-gallery-2.png",
      "/assets/verdaxmarket/verdaxmarket-gallery-3.png",
      "/assets/verdaxmarket/verdaxmarket-gallery-4.png",
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
    image: "/assets/finance-query/financequery.svg",
    gallery: [
      "/assets/finance-query/finance-query-gallery-1.png",
      "/assets/finance-query/finance-query-gallery-2.png",
      "/assets/finance-query/finance-query-gallery-3.png",
    ],
    links: {
      github: "https://github.com/verdenroz/finance-query",
      docs: "https://finance-query.onrender.com/docs",
    },
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
    image: "/assets/google-finance/google-finance.png",
    gallery: [
      "/assets/google-finance/google-finance-gallery-1.png",
      "/assets/google-finance/google-finance-gallery-2.png",
      "/assets/google-finance/google-finance-gallery-3.png",
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
    image: "assets/stockdiviner/stockdiviner.png",
    gallery: [
      "assets/stockdiviner/stockdiviner.png",
      "/assets/stockdiviner/stockdiviner-gallery-1.png",
      "/assets/stockdiviner/stockdiviner-gallery-2.png",
    ],
    links: {
      github: "https://github.com/yourusername/stockdiviner",
    },
  },
];

export default function ProjectCarousel() {
  const carouselRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Projects
      </h2>

      <div
        aria-label="Carousel Controls"
        className="pointer-events-none absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-4 lg:px-8 z-20"
      >
        <button
          type="button"
          onClick={() => scroll("left")}
          title="Previous project slide"
          aria-controls="project-carousel"
          className="pointer-events-auto z-20 aspect-square h-fit rounded-full border-2 border-neutral-400 bg-neutral-950/95 p-4 text-neutral-50 shadow-lg backdrop-blur-sm transition-all hover:border-neutral-300 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutral-950/90"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          title="Next project slide"
          aria-controls="project-carousel"
          className="pointer-events-auto z-20 aspect-square h-fit rounded-full border-2 border-neutral-400 bg-neutral-950/95 p-4 text-neutral-50 shadow-lg backdrop-blur-sm transition-all hover:border-neutral-300 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutral-950/90"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <ul
        ref={carouselRef}
        className="relative z-0 grid auto-cols-min grid-flow-col gap-x-6 overflow-x-auto px-[calc(50vw-clamp(18rem,42vmin,26rem)/2-7px)] pb-4 pt-4 scrollbar-hide"
        aria-label="Project Carousel"
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
                    className="pointer-events-auto h-full w-full object-cover opacity-50 transition-[transform,opacity] duration-700 group-hover:scale-105 group-hover:opacity-75 group-focus-visible:scale-105 group-focus-visible:opacity-75"
                    width={3840}
                    height={2160}
                    sizes="(max-width: 3840px) 100vw, 3840px"
                    loading="lazy"
                  />
                </div>
              </button>
            </ProjectDialog>
          </li>
        ))}
      </ul>
    </section>
  );
}
