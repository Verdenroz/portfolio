import dynamic from "next/dynamic";
import { Header, Footer } from "@/components/layout";
import { Hero, Experience, ProjectCarousel } from "@/components/sections";

const Contributions = dynamic(() => import("@/components/sections/contributions"), {
  loading: () => (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Proof I&apos;m Still Alive
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-card rounded-lg h-[300px] border border-border" />
          ))}
        </div>
      </div>
    </section>
  ),
  ssr: false
});

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
