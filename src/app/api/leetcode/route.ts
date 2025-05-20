import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        query: `
          query userProfileCalendar($username: String!, $year: Int) {
            matchedUser(username: $username) {
              userCalendar(year: $year) {
                activeYears
                streak
                totalActiveDays
                dccBadges {
                  timestamp
                  badge {
                    name
                    icon
                  }
                }
                submissionCalendar
              }
            }
          }
        `,
        variables: {
          username: "Verdenroz"
        },
        operationName: "userProfileCalendar"
      }),
      // Disable Next.js cache
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("LeetCode API error");
    }

    const data = await response.json();
    
    
    return NextResponse.json(data.data.matchedUser.userCalendar, {
        headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error("LeetCode API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" }, 
      { status: 500 }
    );
  }
}