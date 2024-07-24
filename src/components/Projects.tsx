import verdax from "../assets/verdax.png";
import laptop from "../assets/laptop.jpg";
import whereswhat from "../assets/wheres-what.png";
import googlefinance from "../assets/gfinance.png";
import financequery from "../assets/financequery.png";

interface ProjectCardProps {
  name: string;
  date?: string;
  description: string;
  img: string;
  link: string;
  skills: string[];
}

const ProjectCard = ({
  name,
  date,
  description,
  img,
  link,
  skills,
}: ProjectCardProps) => {
  return (
    <div className="flex flex-col items-center w-72">
      <div className="relative">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xl">View Repository</span>
          </div>
          <img
            src={img}
            alt={name}
            className="w-48 h-48 rounded-3xl transition-opacity duration-300 hover:opacity object-cover"
          />
        </a>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <h1 className="text-3xl font-medium font-display text-center text-[#43474C]  mt-4 ">{date}</h1>
        <h2 className="text-2xl font-bold font-display text-center mt-2 hover:underline">
          {name}
        </h2>
      </a>
      <p className="text-lg text-[#43474C] text-center">{description}</p>
      <ul className="flex flex-wrap gap-2 list-none w-full justify-center mt-4">
        {skills.map((skill, index) => (
          <li key={index}>
            <img
              src={`https://skillicons.dev/icons?i=${skill}&theme=dark`}
              alt={skill}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const PastProjects = () => {
  return (
    <div className="mt-8 py-8 border-t-2 border-[#73777D]">
      <h1 className="text-3xl font-bold font-display text-center">
        🌱Past Projects🌱
      </h1>
      <div className="flex flex-wrap gap-16 mt-8 px-4 items-stretch justify-center 2xl:justify-around">
        <ProjectCard
          name="Finance Query"
          date="Jul '24"
          description="FastAPI lambda function for querying finance data"
          img={financequery}
          link="https://github.com/Verdenroz/FinanceQuery"
          skills={["python", "fastapi", "aws", "redis"]}
        />
        <ProjectCard
          name="Google Finance Scraper"
          date="Mar '24"
          description="Firebase cloud function for scraping Google Finance"
          img={googlefinance}
          link="https://github.com/Verdenroz/GoogleFinanceAPI"
          skills={["javascript", "nodejs", "express", "firebase"]}
        />
        <ProjectCard
          name="FSC Where's What"
          date="Dec '23"
          description="Developed campus map Android app connected to Firebase & OSM"
          img={whereswhat}
          link="https://gitlab.com/fsc-clam/fsc-wheres-what"
          skills={["kotlin", "androidstudio", "firebase", "figma"]}
        />
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="w-full rounded-2xl p-8 bg-[#F5F5F5] mt-8">
      <h1 className="text-3xl font-bold font-display text-center">
        ⚡Current Projects⚡
      </h1>
      <div className="flex flex-wrap gap-16 mt-8 px-4 items-center justify-around">
        <ProjectCard
          name="Verdax Market"
          description="Android app for market research"
          img={verdax}
          link="https://github.com/Verdenroz/stockscreener"
          skills={["kotlin", "androidstudio"]}
        />
        <ProjectCard
          name="JobChain"
          description="AI built with Langgraph for job searching"
          img={laptop}
          link="https://github.com/Verdenroz/JobChain"
          skills={["python", "aws"]}
        />
      </div>
      <PastProjects />
    </section>
  );
};

export default Projects;
