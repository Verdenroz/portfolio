import Header from "./components/Header";
import Activities from "./components/Activities";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="lg:ml-[33%] lg:w-2/3 p-6 bg-radial-gradient -z-20 sticky">
      <div className="stars -z-10 ml-60 mb-60 relative">
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
        <div className="star -z-10"></div>
      </div>
        <div className="lg:mr-[15%] lg:ml-[15%] sm:mr-[20%] sm:ml-[20%] mr-[5%] ml-[5%] h-full z-20">
          <Activities />
          <Projects />
        </div>
      </main>
      <footer className="lg:ml-[33%] lg:w-2/3 px-12 py-6 bg-[#0c0d13] border-t-2 border-slate-600">
        <Contact />
      </footer>
    </>
  );
}
