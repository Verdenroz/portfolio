import Header from "@/components/header";
import Hero from "@/components/hero";
import Skills from "@/components/skills";
import ProjectCarousel from "@/components/project-carousel";
import Contributions from "@/components/contributions";
import Experience from "@/components/experience";
import Activities from "@/components/activities";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />
      <Hero />
      <Skills />
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
