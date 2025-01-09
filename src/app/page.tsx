import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import ProjectCarousel from '@/components/ProjectsCarousel'
import GitHubContributions from '@/components/GitHubContributions'
import Experience from '@/components/Experience'
import Activities from '@/components/Activities'
import Footer from '@/components/Footer'
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

