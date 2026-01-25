import { Project } from "@/types";

const parseProjectDate = (date: string) => {
  const parts = date.split(" - ").map((part) => part.trim());
  const startStr = parts[0] ?? "";
  const endStr = parts[1] ?? startStr;

  const start = Date.parse(startStr);
  const end = endStr === "Present" ? Date.parse("9999-12-31") : Date.parse(endStr);

  return {
    start: Number.isFinite(start) ? start : 0,
    end: Number.isFinite(end) ? end : 0,
  };
};

export const projectsData: Project[] = [
  {
    title: "Chimeric",
    description:
      "Unified Python interface for multiple LLM providers with automatic provider detection and seamless switching.",
    date: "2025-06-01 - 2025-09-01",
    skills: [
      { name: "Python", slug: "python" },
      { name: "Pytest", slug: "pytest" },
      { name: "PyPI", slug: "pypi" },
    ],
    image: "/assets/chimeric/chimeric.webp",
    gallery: [
      "/assets/chimeric/chimeric.webp",
      "/assets/chimeric/chimeric-gallery-1.webp",
      "/assets/chimeric/chimeric-gallery-2.webp",
      "/assets/chimeric/chimeric-gallery-3.webp",
      "/assets/chimeric/chimeric-gallery-4.webp",
    ],
    links: {
      github: "https://github.com/Verdenroz/chimeric",
      docs: "https://verdenroz.github.io/chimeric/",
      pypi: "https://pypi.org/project/chimeric/",
    },
    badges: [
      "https://img.shields.io/pypi/v/chimeric.svg",
      "https://img.shields.io/pypi/pyversions/chimeric.svg",
      "https://img.shields.io/badge/License-MIT-yellow.svg",
      "https://img.shields.io/badge/docs-latest-blue.svg",
      "https://github.com/Verdenroz/chimeric/workflows/CI/badge.svg",
      "https://codecov.io/gh/Verdenroz/chimeric/graph/badge.svg?token=UOfsQnGQ3E",
      "https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json",
      "https://img.shields.io/badge/basedpyright-checked-42b883",
      "https://img.shields.io/badge/codespell-checked-42b883"
    ],
  },
  {
    title: "FinanceQuery",
    description:
      "Production-grade RESTful API providing real-time financial data with Redis caching and WebSocket streaming capabilities.",
    date: "2024-04-01 - Present",
    skills: [
      { name: "Python", slug: "python" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "Pytest", slug: "pytest" },
      { name: "Redis", slug: "redis" },
      { name: "AWS", slug: "aws" },
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
      docs: "https://verdenroz.github.io/finance-query/",
    },
    badges: [
      "https://github.com/Verdenroz/finance-query/actions/workflows/tests.yml/badge.svg",
      "https://img.shields.io/github/actions/workflow/status/Verdenroz/finance-query/aws-deploy.yml?branch=master&logo=amazon-aws&label=AWS%20Deploy",
      "https://img.shields.io/github/actions/workflow/status/Verdenroz/finance-query/render-deploy.yml?branch=master&logo=render&label=Render%20Deploy",
      "https://codecov.io/gh/Verdenroz/finance-query/graph/badge.svg?token=0S3003BAZY",
      "https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json",
      "https://img.shields.io/badge/python-3.11+-blue.svg",
      "https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi",
      "https://img.shields.io/badge/License-MIT-yellow.svg"
    ],
  },
  {
    title: "VerdaxMarket",
    description:
      "Modular Android application delivering institutional-quality stock market insights through MVVM architecture.",
    date: "2024-01-01 - 2025-09-01",
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
    title: "JobScrub",
    description:
      "Full-stack AI platform revolutionizing job search through intelligent resume-to-job matching and community-driven insights.",
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
      { name: "AWS", slug: "aws" },
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
      "Cross-platform desktop application combining traditional technical analysis with alternative market indicators.",
    date: "2024-05-31",
    skills: [
      { name: "Java/JavaFX", slug: "openjdk" },
      { name: "Figma", slug: "figma" },
      { name: "Firebase", slug: "firebase" },
    ],
    image: "/assets/stockdiviner/stockdiviner.webp",
    gallery: [
      "/assets/stockdiviner/stockdiviner.webp",
      "/assets/stockdiviner/stockdiviner-gallery-1.webp",
      "/assets/stockdiviner/stockdiviner-gallery-2.webp",
    ],
    links: {
      github: "https://github.com/verdenroz/StockDiviner",
    },
  },
]
  .slice()
  .sort((a, b) => {
    const aDate = parseProjectDate(a.date);
    const bDate = parseProjectDate(b.date);

    if (aDate.end !== bDate.end) return bDate.end - aDate.end;
    if (aDate.start !== bDate.start) return bDate.start - aDate.start;
    return a.title.localeCompare(b.title);
  });