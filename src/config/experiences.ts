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
      "Develop and maintain open source agentic AI software in the fields of finance and talent acquisition.",
    achievements: [
      "Automated hiring and code judging processes for future interns",
      "Created multi-agent system for real-time financial data and sentiment analysis",
    ],
    technologies: ["Python", "AI", "OpenAI API", "Selenium"],
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
      "Created personal portfolio website for stock trader, polling real-time data and setting up Stripe payment/paywall for client's current paying Substack subscribers.",
    achievements: [
      "Gathered requirements with weekly meetings and daily messages",
      "Implemented agile development methodology",
      "Integrated real-time data polling system",
      "Set up Stripe payment gateway for subscription management",
    ],
    technologies: ["React", "Next.js", "Stripe", "Real-time APIs", "Agile"],
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
      "Enhanced application interface by implementing interactive UI components using MUI in a React-based project.",
    achievements: [
      "Architectured data flow pipelines for user analytics",
      "Led migration from PowerBI to React-based charts",
      "Enhanced user interactions through custom UI components",
      "Improved application performance and user experience",
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
      "Delivered competitive market insights, emerging as 1 of 4 final presenters from a 412-member cohort.",
    achievements: [
      "Selected as top 4 presenter from 412-member cohort",
      "Identified strategic growth opportunities in gaming industry",
      "Conducted thorough competitive market research",
      "Presented findings to executive leadership",
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