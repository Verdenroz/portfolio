import Header from '@/components/header'
import Hero from '@/components/hero'
import Skills from '@/components/skills'
import ProjectCarousel from '@/components/project-carousel'
import GitHubContributions from '@/components/github-contributions'
import Experience from '@/components/experience'
import Activities from '@/components/activities'
import Footer from '@/components/footer'
// import ChatBot from '@/components/ChatBot'

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <Hero />
      <Skills />
      <ProjectCarousel />
      <GitHubContributions />
      <Experience />
      <Activities />
      {/* <ChatBot /> */}
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  )
}

