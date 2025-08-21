import { Project } from "@/types";

export const projectsData: Project[] = [
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
  },
  {
    title: "JobScrub",
    description:
      "An AI-enhanced platform to simplify the job search process and empower individuals to advance their careers",
    longDescription:
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