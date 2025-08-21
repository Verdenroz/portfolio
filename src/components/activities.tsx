"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";
import type { Mention } from "@/types";
import { activitiesData } from "@/config/activities";
import Link from "next/link";


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

export default function Activities() {
  return (
    <section id="activities" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Recent Activities
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activitiesData.map((activity, index) => (
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
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
