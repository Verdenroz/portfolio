import { Activity } from "@/types";

export const activitiesData: Activity[] = [
  {
    title: "2nd Place Ramhacks 2025",
    date: "April 27, 2025",
    duration: "48 hours",
    description:
      "Worked with @andrew, @afaq, @phillipe to create a full-stack financial assistant web app using Next.js and FastAPI. Integrated Gemini for multi-agent capabilities, allowing users to interact with multiple AI agents simultaneously.",
    tags: [
      "Hackathon",
      "Fintech",
      "Next.js",
      "FastAPI",
      "Langchain/Langgraph",
      "Gemini",
      "Multi-agent",
    ],
    mentions: [
      {
        text: "@andrew",
        link: "https://www.linkedin.com/in/andrew-kozinski-392613252/",
      },
      {
        text: "@afaq",
        link: "https://www.linkedin.com/in/afaqwaris/",
      },
      {
        text: "@phillipe",
        link: "https://www.linkedin.com/in/philippe-jean-62b126352/",
      },
    ],
    projectLink: "https://github.com/Verdenroz/buff-ai",
  },
  {
    title: "Completed GSWEP Fall 2024",
    date: "January 3, 2024",
    duration: "4 months",
    description:
      "Mentored by another Google senior SWE, I learned from the best on developer best practices and how to tackle Leetcode-style DSA problems.",
    tags: ["Mentorship", "DSA"],
  },
  {
    title: "AssemblyAI Hackathon 2024",
    date: "December 6, 2024",
    duration: "4 hours",
    description:
      "Integrated AssemblyAI's speech-to-text API with Android's AudioRecord API to create a real-time transcription app. Didn't place, but pioneered Android integration with AssemblyAI.",
    tags: ["AI", "Android", "Speech Recognition"],
    projectLink: "https://github.com/Verdenroz/five-shades",
  },
  {
    title: "Completed GSWEP Summer 2024",
    date: "September 28, 2024",
    duration: "4 months",
    description:
      "Mentored by a Google SWE, I learned from the best on developer best practices and how to tackle Leetcode-style DSA problems.",
    tags: ["Mentorship", "DSA"],
  },
  {
    title: "Finalist in Headerstarter's 2nd Hiring Hackathon",
    date: "August 25, 2024",
    duration: "24 hours",
    description:
      "Worked with @alex_farouz to create a full-stack Next.js web app that transcribes audio to text in real-time using AssemblyAI's API, integrating Deepgram with Groq for realtime TTS/STT",
    tags: ["Hackathon", "Next.js", "Speech Recognition", "STT/TTS"],
    mentions: [
      {
        text: "@alex_farouz",
        link: "https://www.linkedin.com/in/alexander-farouz-1433g/",
      },
    ],
    projectLink: "https://github.com/pam-hackathon/pam-voicechat",
  },
  {
    title: "Finalist in Headstarter's 1st Hiring Hackathon",
    date: "August 18, 2024",
    duration: "24 hours",
    description:
      "Worked with @maisha, @naman, @hamzah, @evan to create a full-stack Next.js complaint manager/expense tracker, implementing RAG with Langchain/Langgraph and Pinecone",
    tags: ["Hackathon", "Next.js", "RAG", "Langchain/Langgraph", "Pinecone"],
    mentions: [
      {
        text: "@maisha",
        link: "https://www.linkedin.com/in/maisha-supritee-chowdhury/",
      },
      { text: "@naman", link: "https://www.linkedin.com/in/naman-nagelia/" },
      {
        text: "@hamzah",
        link: "https://www.linkedin.com/in/hamzah-deejay-b28b03294/",
      },
      { text: "@evan", link: "https://www.linkedin.com/in/evan-shoemaker/" },
    ],
    projectLink: "https://github.com/headstarter-hackathon-ruby",
  },
];