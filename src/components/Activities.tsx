'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/solid'
import { Activity, Mention } from "@/types"
import Link from 'next/link'

const activities: Activity[] = [
  {
    title: "Completed GSWEP Fall 2024",
    date: "January 3, 2024",
    duration: "4 months",
    description: "Mentored by another Google senior SWE, I learned from the best on developer best practices and how to tackle Leetcode-style DSA problems.",
    tags: ["Mentorship", "DSA"]
  },
  {
    title: "AssemblyAI Hackathon 2024",
    date: "December 6, 2024",
    duration: "4 hours",
    description: "Integrated AssemblyAI's speech-to-text API with Android's AudioRecord API to create a real-time transcription app. Didn't place, but pioneered Android integration with AssemblyAI.",
    tags: ["AI", "Android", "Speech Recognition"],
    projectLink: "https://github.com/Verdenroz/five-shades"
  },
  {
    title: "Completed GSWEP Summer 2024",
    date: "September 28, 2024",
    duration: "4 months",
    description: "Mentored by a Google SWE, I learned from the best on developer best practices and how to tackle Leetcode-style DSA problems.",
    tags: ["Mentorship", "DSA"]
  },
  {
    title: "Finalist in Headerstarter's 2nd Hiring Hackathon",
    date: "August 25, 2024",
    duration: "24 hours",
    description: "Worked with @alex_farouz to create a full-stack Next.js web app that transcribes audio to text in real-time using AssemblyAI's API, integrating Deepgram with Groq for realtime TTS/STT",
    tags: ["Hackathon", "Next.js", "Speech Recognition", "STT/TTS"],
    mentions: [
      { text: "@alex_farouz", link: "https://www.linkedin.com/in/alexander-farouz-1433g/" }
    ],
    projectLink: "https://github.com/pam-hackathon/pam-voicechat"
  },
  {
    title: "Finalist in Headstarter's 1st Hiring Hackathon",
    date: "August 18, 2024",
    duration: "24 hours",
    description: "Worked with @maisha, @naman, @hamzah, @evan to create a full-stack Next.js complaint manager/expense tracker, implementing RAG with Langchain/Langgraph and Pinecone",
    tags: ["Hackathon", "Next.js", "RAG", "Langchain/Langgraph", "Pinecone"],
    mentions: [
      { text: "@maisha", link: "https://www.linkedin.com/in/maisha-supritee-chowdhury/"},
      { text: "@naman", link: "https://www.linkedin.com/in/naman-nagelia/" },
      { text: "@hamzah", link: "https://www.linkedin.com/in/hamzah-deejay-b28b03294/" },
      { text: "@evan", link: "https://www.linkedin.com/in/evan-shoemaker/"}
    ],
    projectLink: "https://github.com/headstarter-hackathon-ruby"
  }
];

const LinkedDescription = ({ description, mentions, projectLink }: { 
  description: string;
  mentions?: Mention[];
  projectLink?: string;
}) => {
  if (!mentions?.length && !projectLink) {
    return <p className="text-sm text-muted-foreground mb-4">{description}</p>;
  }

  let result = description;
  
  // Replace mentions with links
  mentions?.forEach(mention => {
    result = result.replace(
      mention.text,
      `<a href="${mention.link}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${mention.text}</a>`
    );
  });

  return (
    <div className="mb-4">
      <p 
        className="text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: result }}
      />
      {projectLink && (
        <Link 
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline mt-2 inline-block"
        >
          View Project →
        </Link>
      )}
    </div>
  );
};

export default function Activities() {
  return (
    <section id="activities" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Recent Activities</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{activity.title}</CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{activity.date}</span>
                  <ClockIcon className="w-4 h-4 ml-2" />
                  <span>{activity.duration}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LinkedDescription 
                  description={activity.description}
                  mentions={activity.mentions}
                  projectLink={activity.projectLink}
                />
                <div className="flex flex-wrap gap-2">
                  {activity.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}