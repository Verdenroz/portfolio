import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    color: "F97316",
    badges: [
      {
        name: "Kotlin",
        slug: "kotlin",
        description: "Modern JVM language",
      },
      {
        name: "Python",
        slug: "python",
        description: "High-level multiparadigm language",
      },
      {
        name: "Java",
        slug: "java",
        slugOverride:
          "https://cdn.jsdelivr.net/npm/simple-icons@6/icons/java.svg",
        description: "Object-oriented programming (JVM)",
      },
      {
        name: "TypeScript",
        slug: "typescript",
        description: "Type-safe JavaScript",
      },
      {
        name: "JavaScript",
        slug: "javascript",
        description: "Dynamic language for web development",
      },
      {
        name: "SQL",
        slug: "postgresql/4F8EF7",
        description: "Structured query language for relational databases",
      },
      {
        name: "Rust",
        slug: "rust/FF0000",
        description: "Systems programming language",
      },
      {
        name: "Mojo",
        slug: "mojo",
        slugOverride: "https://assets-global.website-files.com/64174a9fd03969ab5b930a08/64f9f9ed4ecb5d38e455a902_Group%20237%20(2).png",
        description: "High-performance pythonic GPU programming language",
      },
    ],
  },
  {
    name: "Web · API",
    color: "3B82F6",
    badges: [
      {
        name: "React",
        slug: "react",
        description: "JavaScript library for building UIs",
      },
      {
        name: "Next.js",
        slug: "nextdotjs",
        description: "Fullstack React framework",
      },
      {
        name: "TailwindCSS",
        slug: "tailwindcss",
        description: "Utility-first CSS framework",
      },
      {
        name: "FastAPI",
        slug: "fastapi",
        description: "Modern web framework for Python",
      },
      {
        name: "Stripe",
        slug: "stripe",
        description: "Payment processing API",
      },
      {
        name: "Node.js",
        slug: "nodedotjs",
        description: "JavaScript runtime for server-side development",
      },
      {
        name: "Express",
        slug: "express",
        description: "Minimal Node.js web server",
      },
      {
        name: "Axios",
        slug: "axios",
        description: "Promise-based HTTP client for JavaScript",
      },
      {
        name: "Cheerio",
        slug: "cheerio",
        description: "Server-side implementation of core jQuery",
      },
      {
        name: "Swagger",
        slug: "swagger",
        description: "API documentation and testing framework",
      },
      {
        name: "MUI",
        slug: "mui",
        description: "Material Design component library for React",
      },
      {
        name: "Algolia",
        slug: "algolia",
        description: "Search-as-a-service platform",
      },
    ],
  },
  {
    name: "Mobile · Android",
    color: "14B8A6",
    badges: [
      {
        name: "Android",
        slug: "android",
        description: "Native Android SDK for mobile apps",
      },
      {
        name: "Jetpack Compose",
        slug: "jetpackcompose",
        description: "Modern UI toolkit for Android",
      },
      {
        name: "Gradle",
        slug: "gradle/20976C",
        description: "Build automation tool",
      },
      {
        name: "Flows & Coroutines",
        slug: "kotlin",
        description: "Asynchronous programming in Kotlin",
      },
      {
        name: "Hilt & Dagger",
        slug: "google",
        description: "Android dependency injection libraries",
      },
      {
        name: "Room",
        slug: "sqlite/4F8EF7",
        description: "Abstracted SQLite database",
      },
      {
        name: "Google Play",
        slug: "googleplay/34D399",
        description: "Android app distribution platform",
      },
    ],
  },
  {
    name: "Cloud · DevOps",
    color: "6366F1",
    badges: [
      {
        name: "Firebase",
        slug: "firebase",
        description: "Google's serverless backend",
      },
      {
        name: "Supabase",
        slug: "supabase",
        description: "Open-source Firebase alternative",
      },
      {
        name: "Pinecone",
        slug: "pinecone",
        slugOverride: "https://www.pinecone.io/favicon.ico",
        description: "Managed vector database",
      },
      {
        name: "Docker",
        slug: "docker",
        description: "Containerization platform",
      },
      {
        name: "Redis",
        slug: "redis",
        description: "Low latency key-value store",
      },
      {
        name: "AWS",
        slug: "aws",
        slugOverride: "https://cdn.jsdelivr.net/npm/simple-icons@6/icons/amazonaws.svg",
        description: "Amazon's cloud computing platform",
      },
      {
        name: "Google Cloud",
        slug: "googlecloud",
        description: "Google's cloud computing platform",
      },
    ],
  },
  {
    name: "AI · ML",
    color: "8B5CF6",
    badges: [
      {
        name: "LangChain",
        slug: "langchain/20976C",
        description: "LLM application framework",
      },
      {
        name: "LangGraph",
        slug: "langgraph/20976C",
        description: "LLM orchestration framework",
      },
      {
        name: "PyTorch",
        slug: "pytorch",
        description: "Neural network library",
      },
      {
        name: "Hugging Face",
        slug: "huggingface",
        description: "Open-source NLP model hub",
      },
      {
        name: "OpenAI",
        slug: "openai",
        description: "Provider of LLM APIs",
      },
      {
        name: "Gemini",
        slug: "google",
        description: "Google's generative AI model",
      },
      {
        name: "TensorFlow",
        slug: "tensorflow",
        description: "Machine learning library",
      },
    ],
  },
  {
    name: "Libraries · Tools",
    color: "F59E0B",
    badges: [
      {
        name: "PyO3",
        slug: "pyo3",
        slugOverride: "https://avatars.githubusercontent.com/u/28156855?s=200&v=4",
        description: "Rust bindings for Python",
      },
      {
        name: "PyPI",
        slug: "pypi",
        description: "Python Package Index",
      },
      {
        name: "Tokio",
        slug: "tokio",
        description: "Async runtime for Rust",
      },
      {
        name: "Polars",
        slug: "polars",
        description: "Fast DataFrame library",
      },
      {
        name: "Clap",
        slug: "clap",
        slugOverride: "https://github.com/clap-rs/clap/blob/master/assets/clap.png?raw=true",
        description: "Rust CLI framework",
      },
      {
        name: "Ratatui",
        slug: "ratatui",
        slugOverride: "https://raw.githubusercontent.com/ratatui/ratatui/main/assets/logo.png",
        description: "Rust TUI framework",
      },
      {
        name: "SQLite",
        slug: "sqlite",
        description: "Embedded relational database",
      },
      {
        name: "Serde",
        slug: "serde",
        slugOverride: "https://serde.rs/gitbook/images/apple-touch-icon-precomposed-152.png",
        description: "Rust serialization framework",
      },
      {
        name: "Nginx",
        slug: "nginx",
        description: "High-performance web server and reverse proxy",
      },
      {
        name: "Caddy",
        slug: "caddy",
        description: "Modern web server with automatic HTTPS",
      },
    ],
  },
  {
    name: "Design · Testing",
    color: "EC4899",
    badges: [
      {
        name: "Pytest",
        slug: "pytest",
        description: "Python testing framework",
      },
      {
        name: "Material Design",
        slug: "materialdesign/000000",
        description: "Google's design system",
      },
      {
        name: "Figma",
        slug: "figma",
        description: "Collaborative interface design tool",
      },
      {
        name: "JUnit",
        slug: "junit5",
        description: "Java testing framework",
      },
    ],
  },
];