'use client'

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Harvey Tseng. All rights reserved.</p>
      </div>
    </footer>
  )
}

