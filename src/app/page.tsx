import { Header, Footer } from "@/components/layout";
import { Hero, ProjectCarousel, Contributions, Experience, Activities } from "@/components/sections";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />
      <Hero />
      <ProjectCarousel />
      <Contributions />
      <Experience />
      <Activities />
      {/* <ChatBot /> */}
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
