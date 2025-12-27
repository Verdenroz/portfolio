import { Header, Footer } from "@/components/layout";
import { Hero, Contributions, Experience, ProjectCarousel } from "@/components/sections";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />
      <Hero />
      <Contributions />
      <Experience />
      <ProjectCarousel />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
