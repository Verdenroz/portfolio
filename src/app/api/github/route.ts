import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  
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

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({ query }),
      // Disable Next.js cache
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("GitHub API error");
    }

    const data = await response.json();
    
    // Add cache headers to our API response
    return NextResponse.json(data.data.user.contributionsCollection.contributionCalendar, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600'
      }
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" }, 
      { status: 500 }
    );
  }
}