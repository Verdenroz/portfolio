import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    title: "FinanceQuery",
    description:
      "Production-grade RESTful API providing real-time financial data with Redis caching and WebSocket streaming capabilities.",
    keypoints: [
      "Optimized web scraping using lxml and asyncio for high throughput data extraction, extending to international markets",
      "High-performance data pipeline with efficient Redis caching strategies, achieving sub-200ms response times",
      "Real-time market streaming via WebSocket and SSE with Cython integration for accelerated technical indicator calculations",
      "Dockerized deployment supporting AWS Lambda and Render with automated rate limiting and API security",
      "Maintains above 95% test coverage with pytest, ensuring robust and reliable API functionality",
    ],
    date: "2024-04-01 - Present",
    skills: [
      { name: "Python", slug: "python" },
      { name: "FastAPI", slug: "fastapi" },
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
    keypoints: [
      "MVVM architecture with multi-module design and dependency injection using Hilt & Dagger",
      "Jetpack Compose UI with Material themes and responsive design patterns",
      "Firebase integration with Authentication and Crashlytics",
      "Algolia-powered search providing user analytics for stocks throughout international markets",
    ],
    date: "2024-01-01 - Present",
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
    keypoints: [
      "Multi-agent AI system with LangGraph orchestration and HuggingFace transformers for resume analysis",
      "Vector similarity search implementation using Pinecone for semantic job matching",
      "'Scrubby' assistant with context-aware conversation memory and chat persistence",
      "Intelligent filtering and recommendation system streamlining job search workflow"
    ],
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
    keypoints: [
      "Web scraping tool for Google Finance using Node.js and Express",
      "Comprehensive API documentation with Swagger integration",
      "Firebase hosting with reliable cloud deployment",
      "Clean data extraction using axios and cheerio libraries"
    ],
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
    keypoints: [
      "Led cross-functional development team as SCRUM Master implementing agile methodologies",
      "JavaFX application with MVC patterns and clean architecture principles",
      "Comprehensive unit testing with JUnit framework and Test-Driven Development practices",
      "Collaborative Figma prototyping for intuitive UI/UX design and user workflow optimization"
    ],
    date: "2024-05-31",
    skills: [
      { name: "Java/JavaFX", slug: "openjdk" },
      { name: "Figma", slug: "figma" },
      { name: "Firebase", slug: "firebase" },
    ],
    image: "assets/stockdiviner/stockdiviner.webp",
    gallery: [
      "/assets/stockdiviner/stockdiviner.webp",
      "/assets/stockdiviner/stockdiviner-gallery-1.webp",
      "/assets/stockdiviner/stockdiviner-gallery-2.webp",
    ],
    links: {
      github: "https://github.com/verdenroz/StockDiviner",
    },
  },
];