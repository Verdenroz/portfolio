import { Metadata } from "next";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";
import type { Mention } from "@/types";
import { activitiesData } from "@/config/activities";
import { Header } from "@/components/layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Activities | Harvey Tseng",
  description: "All development activities, hackathons, and achievements by Harvey Tseng",
};

const LinkedDescription = ({
  description,
  mentions,
  projectLink,
}: {
  description: string;
  mentions?: Mention[];
  projectLink?: string;
}) => {
  if (!mentions?.length && !projectLink) {
    return <p className="text-sm text-muted-foreground mb-4">{description}</p>;
  }

  let result = description;

  // Replace mentions with links
  mentions?.forEach((mention) => {
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

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-muted pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              All Activities
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive view of my development activities, hackathons, mentorship programs, and achievements
            </p>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activitiesData.map((activity, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{activity.date}</span>
                    <ClockIcon className="w-4 h-4 ml-2" />
                    <span>{activity.duration}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <LinkedDescription
                    description={activity.description}
                    mentions={activity.mentions}
                    projectLink={activity.projectLink}
                  />
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {activity.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}