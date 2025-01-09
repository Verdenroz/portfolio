"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { parseISO, format, eachDayOfInterval, setHours } from "date-fns";
import { ContributionDay, ContributionWeek} from "@/types";
import Image from "next/image";

const fetchGitHubContributions = async () => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const query = `
    query {
      user(login: "verdenroz") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  const data = await response.json();
  return {
    totalContributions:
      data.data.user.contributionsCollection.contributionCalendar
        .totalContributions,
    weeks: data.data.user.contributionsCollection.contributionCalendar.weeks,
  };
};

const ContributionCell: React.FC<{ count: number; date: string }> = ({
  count,
  date,
}) => {
  const bgColor =
    count === 0
      ? "bg-gray-300"
      : count <= 5
      ? "bg-green-400"
      : count <= 10
      ? "bg-green-500"
      : count <= 20
      ? "bg-green-600"
      : "bg-green-700";

  // Parse the ISO date string and set to noon to avoid timezone issues
  const parsedDate = setHours(parseISO(date), 12);

  return (
    <div
      className={`w-3 h-3 m-0.5 ${bgColor}`}
      title={`${count} contributions on ${format(parsedDate, "MMMM do")}`}
    />
  );
};

interface ContributionChartProps {
  contributions: ContributionDay[];
}

const ContributionChart: React.FC<ContributionChartProps> = ({
  contributions,
}) => {
  // Parse the ISO date string and set to noon to avoid timezone issues
  const firstContributionDate = contributions[0]?.date;
  const start = setHours(parseISO(firstContributionDate), 12);
  const end = setHours(new Date(), 12);

  const contributionMap = new Map(
    contributions.map((day) => [day.date, day.contributionCount])
  );

  const weeks: {
    contributionDays: { date: string; contributionCount: number }[];
  }[] = [];
  let currentWeek: { date: string; contributionCount: number }[] = [];

  const allDays = eachDayOfInterval({ start, end });

  allDays.forEach((day) => {
    const dateStr = format(day, "yyyy-MM-dd");

    if (currentWeek.length === 7) {
      weeks.push({ contributionDays: [...currentWeek] });
      currentWeek = [];
    }

    currentWeek.push({
      date: dateStr,
      contributionCount: contributionMap.get(dateStr) || 0,
    });
  });

  if (currentWeek.length > 0) {
    weeks.push({ contributionDays: currentWeek });
  }

  // Calculate month labels
  const monthLabels: { month: string; colspan: number }[] = [];
  let currentMonth = "";
  let currentColspan = 0;

  weeks.forEach((week, index) => {
    const month = format(new Date(week.contributionDays[0].date), "MMM");
    if (month === currentMonth) {
      currentColspan += 1;
    } else {
      if (currentMonth) {
        monthLabels.push({ month: currentMonth, colspan: currentColspan });
      }
      currentMonth = month;
      currentColspan = 1;
    }
    if (index === weeks.length - 1) {
      monthLabels.push({ month: currentMonth, colspan: currentColspan });
    }
  });

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <table className="table-fixed border-spacing-[3px] border-separate">
        <thead>
          <tr>
            <th className="w-4" />
            {monthLabels.map((label, i) => (
              <th
                key={i}
                className="text-xs text-muted-foreground font-normal h-8"
                colSpan={label.colspan}
              >
                {label.month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 7 }).map((_, dayOfWeek) => (
            <tr key={dayOfWeek}>
              <td className="text-xs text-muted-foreground pr-2 w-4 text-right">
                {dayOfWeek === 1
                  ? "Mon"
                  : dayOfWeek === 3
                  ? "Wed"
                  : dayOfWeek === 5
                  ? "Fri"
                  : ""}
              </td>
              {weeks.map((week, weekIndex) => {
                const day = week.contributionDays[dayOfWeek];
                if (!day) return <td key={weekIndex} className="w-4 h-4" />;
                return (
                  <td key={weekIndex} className="p-0 w-4 h-4">
                    <ContributionCell
                      count={day.contributionCount}
                      date={day.date}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getContributions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGitHubContributions();
        const contributionDays = data.weeks
          .flatMap((week: ContributionWeek) => week.contributionDays)
          .map((day: ContributionDay) => ({
            date: day.date,
            contributionCount: day.contributionCount,
          }));
        setContributions(contributionDays);
        setTotalContributions(data.totalContributions);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        toast({
          title: "Error",
          description: "Failed to fetch GitHub contributions",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getContributions();
  }, [toast]);

  if (isLoading || error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            GitHub Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="animate-pulse">
              <CardHeader>
                <div className="h-8 bg-muted rounded w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded" />
              </CardContent>
            </Card>
            <Card className="animate-pulse w-full md:max-w-none">
              <CardContent className="flex items-center justify-center p-6">
                <div className="relative w-full max-w-2xl aspect-[2/1] bg-muted rounded" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contributions" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          GitHub Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {totalContributions.toLocaleString()} Contributions in the Last
                Year
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ContributionChart contributions={contributions} />
            </CardContent>
          </Card>
          <Card className="w-full md:max-w-none">
            <CardContent className="flex items-center justify-center p-6">
              <div className="relative w-full max-w-2xl aspect-[2/1]">
                <Image
                  src="https://github-readme-stats.vercel.app/api?username=verdenroz&show_icons=true&theme=transparent&hide_border=true"
                  alt="GitHub Stats"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
