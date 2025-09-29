import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/layout"
import { Toaster } from '@/components/ui'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Harvey Tseng - Developer Portfolio',
  description: 'Full Stack Developer specializing in fintech and stock market applications',
  metadataBase: new URL('https://harveytseng.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}

