"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { parseISO, format, eachDayOfInterval, setHours } from "date-fns";
import type { ContributionDay, ContributionWeek } from "@/types";
import Image from "next/image";
import { toast } from "sonner";

const fetchGitHubContributions = async () => {
  const response = await fetch("/api/github");

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub Contributions");
  }

  const data = await response.json();
  return {
    totalContributions: data.totalContributions,
    weeks: data.weeks,
  };
};

const fetchLeetCodeContributions = async () => {
  const response = await fetch("/api/leetcode");
  if (!response.ok) {
    throw new Error("Failed to fetch LeetCode Contributions");
  }

  const data = await response.json();
  return {
    submissionCalendar: data.submissionCalendar,
  };
};

const ContributionCell: React.FC<{
  count: number;
  date: string;
  theme: "github" | "leetcode";
}> = ({ count, date, theme }) => {
  const bgColor =
    theme === "github"
      ? count === 0
        ? "bg-gray-500"
        : count <= 5
        ? "bg-green-900"
        : count <= 10
        ? "bg-green-700"
        : count <= 20
        ? "bg-green-600"
        : "bg-green-500"
      : count === 0
      ? "bg-gray-500"
      : count <= 5
      ? "bg-orange-900"
      : count <= 10
      ? "bg-orange-700"
      : count <= 20
      ? "bg-orange-600"
      : "bg-orange-500";

  // Parse the ISO date string and set to noon to avoid timezone issues
  const parsedDate = setHours(parseISO(date), 12);

  return (
    <div
      className={`w-2 h-2 sm:w-3 sm:h-3 m-0.5 sm:m-[2px] ${bgColor} rounded-[1px]`}
      title={`${count} contributions on ${format(parsedDate, "MMMM do")}`}
    />
  );
};

const ContributionChart: React.FC<{
  contributions: ContributionDay[];
  theme: "github" | "leetcode";
}> = ({ contributions, theme }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const firstContributionDate = contributions[0]?.date;
  // Handle case when there are no contributions yet
  const start = contributions.length > 0
    ? setHours(parseISO(firstContributionDate), 12)
    : setHours(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()), 12); // Default to 1 year ago
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

  // Auto-scroll to the right to show recent dates first
  useEffect(() => {
    const scrollToRight = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        // Scroll to the rightmost position
        container.scrollLeft = container.scrollWidth - container.clientWidth;
      }
    };

    // Scroll after a brief delay to ensure content is rendered
    const timeoutId = setTimeout(scrollToRight, 100);
    return () => clearTimeout(timeoutId);
  }, [contributions, theme]); // Re-scroll when data changes

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
    <div 
      ref={scrollContainerRef}
      className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
    >
      <div className="min-w-fit w-full">
        <table className="table-fixed border-spacing-[2px] sm:border-spacing-[3px] border-separate min-w-full">
          <thead>
            <tr>
              <th className="w-3 sm:w-4" />
              {monthLabels.map((label, i) => (
                <th
                  key={i}
                  className="text-xs text-muted-foreground font-normal h-6 sm:h-8 px-1"
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
                <td className="text-xs text-muted-foreground pr-1 sm:pr-2 w-3 sm:w-4 text-right">
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
                  if (!day) return <td key={weekIndex} className="w-3 h-3 sm:w-4 sm:h-4" />;
                  return (
                    <td key={weekIndex} className="p-0 w-3 h-3 sm:w-4 sm:h-4">
                      <ContributionCell
                        count={day.contributionCount}
                        date={day.date}
                        theme={theme}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Contributions() {
  const githubCardTheme = "vue-dark";
  const leetCodeCardTheme = "nord";
  const [contributions, setGitHubContributions] = useState<ContributionDay[]>(
    []
  );
  const [leetCodeContributions, setLeetCodeContributions] = useState<
    ContributionDay[]
  >([]);
  const [totalGitHubContributions, setTotalGitHubContributions] =
    useState<number>(0);
  const [totalLeetCodeContributions, setTotalLeetCodeContributions] =
    useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGithubContributions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGitHubContributions();
        const contributionDays = data.weeks
          .flatMap((week: ContributionWeek) => week.contributionDays)
          .map((day: ContributionDay) => ({
            date: day.date,
            contributionCount: day.contributionCount,
          }));
        setGitHubContributions(contributionDays);
        setTotalGitHubContributions(data.totalContributions);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        toast.error("Error", {
          description: "Failed to fetch GitHub Contributions",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const getLeetCodeContributions = async () => {
      try {
        const data = await fetchLeetCodeContributions();
        const submissionCalendar = JSON.parse(data.submissionCalendar);

        const leetCodeContributionDays = Object.entries(submissionCalendar).map(
          ([timestamp, count]) => {
            // Convert Unix timestamp (in seconds) to date
            const date = new Date(parseInt(timestamp) * 1000);
            // Add one day to fix the off-by-one issue
            date.setDate(date.getDate() + 1);
            return {
              date: format(date, "yyyy-MM-dd"),
              contributionCount: count as number,
            };
          }
        );

        const totalContributions = leetCodeContributionDays.reduce(
          (acc, day) => acc + day.contributionCount,
          0
        );

        setLeetCodeContributions(leetCodeContributionDays);
        setTotalLeetCodeContributions(totalContributions);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        toast.error("Error", {
          description: "Failed to fetch LeetCode Contributions",
        });
      }
    };

    getLeetCodeContributions();
    getGithubContributions();
  }, []);

  if (isLoading || error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Proof I&apos;m Still Alive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
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
          Proof I&apos;m Still Alive
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {totalGitHubContributions.toLocaleString()} GitHub Contributions
                in the last year
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ContributionChart contributions={contributions} theme="github" />
            </CardContent>
          </Card>
          <Card className="w-full md:max-w-none">
            <CardContent className="flex h-full items-center justify-center p-6">
              <div className="relative w-full max-w-2xl aspect-[2/1]">
                <Image
                  src={`https://github-readme-stats-pied-nine-61.vercel.app/api?username=verdenroz&show_icons=true&theme=${githubCardTheme}&hide_border=true`}
                  alt="GitHub Stats"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {totalLeetCodeContributions.toLocaleString()} LeetCode
                Submissions in the last year
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ContributionChart
                contributions={leetCodeContributions}
                theme="leetcode"
              />
            </CardContent>
          </Card>
          <Card className="w-full md:max-w-none">
            <CardContent className="flex h-full items-center justify-center p-6">
              <div className="relative w-full max-w-2xl aspect-[2/1]">
                <Image
                  src={`https://leetcard.jacoblin.cool/Verdenroz?theme=${leetCodeCardTheme}&font=Poppins`}
                  alt="Leetcode Stats"
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
