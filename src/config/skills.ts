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
        proficiency: "Proficient",
      },
      {
        name: "Python",
        slug: "python",
        description: "High-level multiparadigm language",
        proficiency: "Proficient",
      },
      {
        name: "Java",
        slug: "java",
        slugOverride:
          "https://cdn.jsdelivr.net/npm/simple-icons@6/icons/java.svg",
        description: "Object-oriented programming (JVM)",
        proficiency: "Familiar",
      },
      {
        name: "TypeScript",
        slug: "typescript",
        description: "Type-safe JavaScript",
        proficiency: "Familiar",
      },
      {
        name: "JavaScript",
        slug: "javascript",
        description: "Dynamic language for web development",
        proficiency: "Familiar",
      },
      {
        name: "SQL",
        slug: "postgresql/4F8EF7",
        description: "Structured query language for relational databases",
        proficiency: "Familiar",
      },
      {
        name: "Rust",
        slug: "rust/FF0000",
        description: "Systems programming language",
        proficiency: "Learning",
      },
      {
        name: "Mojo",
        slug: "mojo",
        slugOverride: "https://assets-global.website-files.com/64174a9fd03969ab5b930a08/64f9f9ed4ecb5d38e455a902_Group%20237%20(2).png",
        description: "High-performance pythonic GPU programming language",
        proficiency: "Learning",
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
        proficiency: "Proficient",
      },
      {
        name: "Next.js",
        slug: "nextdotjs",
        description: "Fullstack React framework",
        proficiency: "Proficient",
      },
      {
        name: "TailwindCSS",
        slug: "tailwindcss",
        description: "Utility-first CSS framework",
        proficiency: "Proficient",
      },
      {
        name: "FastAPI",
        slug: "fastapi",
        description: "Modern web framework for Python",
        proficiency: "Proficient",
      },
      {
        name: "Stripe",
        slug: "stripe",
        description: "Payment processing API",
        proficiency: "Familiar",
      },
      {
        name: "Express",
        slug: "express",
        description: "Minimal Node.js web server",
        proficiency: "Familiar",
      },
      {
        name: "MUI",
        slug: "mui",
        description: "Material Design component library for React",
        proficiency: "Familiar",
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
        proficiency: "Proficient",
      },
      {
        name: "Jetpack Compose",
        slug: "jetpackcompose",
        description: "Modern UI toolkit for Android",
        proficiency: "Proficient",
      },
      {
        name: "Gradle",
        slug: "gradle/20976C",
        description: "Build automation tool",
        proficiency: "Familiar",
      },
      {
        name: "Flows & Coroutines",
        slug: "kotlin",
        description: "Asynchronous programming in Kotlin",
        proficiency: "Familiar",
      },
      {
        name: "Hilt & Dagger",
        slug: "google",
        description: "Android dependency injection libraries",
        proficiency: "Familiar",
      },
      {
        name: "Room",
        slug: "sqlite/4F8EF7",
        description: "Abstracted SQLite database",
        proficiency: "Familiar",
      },
      {
        name: "Google Play",
        slug: "googleplay/34D399",
        description: "Android app distribution platform",
        proficiency: "Learning",
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
        proficiency: "Proficient",
      },
      {
        name: "Supabase",
        slug: "supabase",
        description: "Open-source Firebase alternative",
        proficiency: "Proficient",
      },
      {
        name: "Pinecone",
        slug: "pinecone",
        slugOverride: "https://www.pinecone.io/favicon.ico",
        description: "Managed vector database",
        proficiency: "Proficient",
      },
      {
        name: "Docker",
        slug: "docker",
        description: "Containerization platform",
        proficiency: "Familiar",
      },
      {
        name: "Redis",
        slug: "redis",
        description: "Low latency key-value store",
        proficiency: "Familiar",
      },
      {
        name: "AWS",
        slug: "aws",
        slugOverride: "https://cdn.jsdelivr.net/npm/simple-icons@6/icons/amazonaws.svg",
        description: "Amazon's cloud computing platform",
        proficiency: "Familiar",
      },
      {
        name: "Google Cloud",
        slug: "googlecloud",
        description: "Google's cloud computing platform",
        proficiency: "Learning",
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
        proficiency: "Proficient",
      },
      {
        name: "LangGraph",
        slug: "langgraph/20976C",
        description: "LLM orchestration framework",
        proficiency: "Proficient",
      },
      {
        name: "PyTorch",
        slug: "pytorch",
        description: "Neural network library",
        proficiency: "Familiar",
      },
      {
        name: "Hugging Face",
        slug: "huggingface",
        description: "Open-source NLP model hub",
        proficiency: "Familiar",
      },
      {
        name: "OpenAI",
        slug: "openai",
        description: "Provider of LLM APIs",
        proficiency: "Familiar",
      },
      {
        name: "TensorFlow",
        slug: "tensorflow",
        description: "Machine learning library",
        proficiency: "Learning",
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
        proficiency: "Proficient",
      },
      {
        name: "Material Design",
        slug: "materialdesign/000000",
        description: "Google's design system",
        proficiency: "Proficient",
      },
      {
        name: "Figma",
        slug: "figma",
        description: "Collaborative interface design tool",
        proficiency: "Familiar",
      },
      {
        name: "JUnit",
        slug: "junit5",
        description: "Java testing framework",
        proficiency: "Familiar",
      },
    ],
  },
];