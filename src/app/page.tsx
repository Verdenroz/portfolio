import dynamic from "next/dynamic";
import { Header, Footer } from "@/components/layout";
import { Hero } from "@/components/sections";

// Lazy load non-critical sections
const ProjectCarousel = dynamic(() => import("@/components/sections/project-carousel"), {
  ssr: false,
});
const Contributions = dynamic(() => import("@/components/sections/contributions"), {
  ssr: false,
});
const Experience = dynamic(() => import("@/components/sections/experience"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />
      <Hero />
      <ProjectCarousel />
      <Contributions />
      <Experience />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
