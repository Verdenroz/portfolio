import { Experience } from "@/types";

export const experiencesData: Experience[] = [
  {
    id: "klover-2025",
    company: "Klover",
    position: "Software Engineer Intern",
    location: "Remote",
    timeframe: "March 2025 – Present",
    startDate: new Date(2025, 2), // March 2025
    endDate: null,
    description:
      "Lead engineer for AI-powered personalized newsletter platform and intern hiring automation system.",
    achievements: [
      "Built personalized article feed system using 1536-dimensional OpenAI embeddings with PostgreSQL vector similarity matching",
      "Implemented real-time ML-powered preference learning system that adapts to user interactions with weighted feedback algorithms",
      "Architected full-stack application with Next.js 15, React 19, Supabase backend, and Stripe payment integration",
      "Automated hiring and code judging processes for future interns"
    ],
    technologies: ["Python", "AI", "Selenium", "Next.js", "Supabase", "PostgreSQL", "Stripe"],
    type: "internship",
    experienceGroup: "AI Development",
    },
    {
    id: "freelance-kevin-2025",
    company: "Kevin Schoovaerts",
    position: "Freelance Full-stack Developer",
    location: "Remote",
    timeframe: "March 2025 – Present",
    startDate: new Date(2025, 2), // March 2025
    endDate: null,
    description:
      "Architected and delivered comprehensive fintech solutions including a production-ready portfolio platform with real-time market data integration, subscription monetization system, and a sophisticated stock investing prompt library with database-driven content management.",
    achievements: [
      "Engineered dynamic portfolio platform featuring real-time market data integration with Stripe paywall implementation for existing Substack subscriber base",
      "Designed and implemented stock investing prompt library utilizing Supabase backend architecture with PostgreSQL database for scalable content management and retrieval",
      "Established comprehensive project lifecycle management through structured weekly stakeholder meetings and daily communication protocols, ensuring iterative delivery and requirement alignment"
    ],
    technologies: ["React", "Next.js", "Stripe", "Supabase", "PostgreSQL", "Agile"],
    type: "freelance",
    experienceGroup: "Full Stack Development",
  },
  {
    id: "commons-xr-2024",
    company: "The Commons XR",
    position: "Full-Stack Developer Intern",
    location: "Remote",
    timeframe: "September 2024 – January 2025",
    startDate: new Date(2024, 8), // September 2024
    endDate: new Date(2025, 0), // January 2025
    description:
      "Led enterprise data visualization migration from PowerBI to React-based charts, enhancing user analytics capabilities for XR application platform.",
    achievements: [
      "Enhanced application interface by implementing interactive UI components using MUI in a React-based project",
      "Architectured data flow pipelines for user analytics, leading migration from PowerBI to React-based charts for enhanced user interactions",
    ],
    technologies: [
      "React",
      "Material-UI",
      "PowerBI",
      "Data Analytics",
      "UI/UX",
    ],
    type: "internship",
    experienceGroup: "Full Stack Development",
  },
  {
    id: "headstarter-2024",
    company: "Headstarter",
    position: "Software Engineering Fellow",
    location: "Remote",
    timeframe: "June 2024 – September 2024",
    startDate: new Date(2024, 5), // June 2024
    endDate: new Date(2024, 8), // September 2024
    description:
      "Fellowship program focused on building a full-stack web application using React, Next.js, and AI.",
    achievements: ["Finalist in 2 hiring hackathons"],
    technologies: ["React", "Next.js", "AI"],
    type: "internship",
    experienceGroup: "AI Development",
  },
  {
    id: "mobalytics-2024",
    company: "Extern",
    position: "Mobalytics Remote Extern",
    location: "Remote",
    timeframe: "May 2024 – June 2024",
    startDate: new Date(2024, 4), // May 2024
    endDate: new Date(2024, 5), // June 2024
    description:
      "Delivered strategic market analysis and growth recommendations for gaming analytics platform, selected as top presenter from 412-person competitive cohort.",
    achievements: [
      "Delivered competitive market insights, emerging as 1 of 4 final presenters from a 412-member cohort",
      "Identified strategic growth opportunities in the gaming industry through thorough market research",
    ],
    technologies: [
      "Market Research",
      "Data Analysis",
      "Competitive Analysis",
      "Strategic Planning",
    ],
    type: "internship",
  },
  {
    id: "farmingdale-2023",
    company: "Farmingdale State College",
    position: "Mathematics Tutor",
    location: "Farmingdale, NY",
    timeframe: "September 2023 – Present",
    startDate: new Date(2023, 8), // September 2023
    endDate: null,
    description:
      "Tutored undergraduate students in mathematics, focusing on calculus and statistics, while developing personalized learning plans.",
    achievements: [
      "Aided over 50 students each semester in improving their math skills",
      "Tailored teaching methods to individual learning styles",
    ],
    technologies: ["Mathematics", "Tutoring"],
    type: "part-time",
    experienceGroup: "Education",
  },
  {
    id: "coachart-2023",
    company: "CoachArt",
    position: "Coding Coach",
    location: "Remote",
    timeframe: "November 2022 - February 2023",
    startDate: new Date(2022, 10), // November 2022
    endDate: new Date(2023, 1), // February 2023
    description:
      "Taught Python programming and game development to children with chronic illnesses, fostering a supportive learning environment.",
    achievements: [
      "Developed engaging lesson plans for children",
      "Fostered a supportive and inclusive learning environment",
      "Encouraged creativity and problem-solving skills",
      "Mentored students in their coding journey",
    ],
    technologies: ["Python", "Game Development", "Teaching", "Mentoring"],
    type: "volunteer",
    experienceGroup: "Full Stack Development",
  },
  {
    id: "macys-2022",
    company: "Macy's",
    position: "Sales Associate",
    location: "New York, NY",
    timeframe: "June 2022 - September 2023",
    startDate: new Date(2022, 5), // June 2022
    endDate: new Date(2023, 8), // September 2023
    description:
      "Provided exceptional customer service and assisted in sales operations, contributing to a positive shopping experience.",
    achievements: [
      "Received positive customer feedback for service excellence",
      "Trained new employees on sales techniques and customer service",
    ],
    technologies: ["Customer Service", "Sales", "Teamwork"],
    type: "part-time",
  },
];