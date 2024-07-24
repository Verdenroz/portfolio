import avatar from "../assets/profile.jpg";
import resume from "../assets/HT_Resume.pdf";

const Header = () => {
  return (
    <div className="flex flex-col justify-evenly gap-6 lg:items-end lg:h-screen lg:w-1/3 lg:px-8 lg:py-2 p-6 h-fit w-screen bg-[#DFE3E9] lg:fixed static top-0 z-50">
      {/* Profile */}
      <div className="flex flex-col gap-8 items-center justify-center">
        <img
          className="md:size-64 size-48 rounded-full border-4 border-black shrink-0"
          src={avatar}
          alt="Avatar"
        />
        <div className="items-center justify-center">
          <h1 className="text-3xl text-center font-black font-display text-[#43474C] hover:text-blue-500">
            Harvey Tseng
          </h1>
          <p className="mt-4 text-lg text-center text-[#43474C]">
            Hi, I'm a senior CS student at Farmingdale State College. I develop
            Android apps and research AI. I have a particular interest in
            finance and birds! 🐦
          </p>
          <ul className="flex mt-8 list-none items-center justify-around">
            <li>
              <a
                target="_blank"
                href="https://github.com/Verdenroz"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="48"
                  height="48"
                  viewBox="0 0 64 64"
                  className="fill-black hover:fill-blue-500"
                >
                  <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href={resume}
                download
                rel="noreferrer"
                className="bg-black text-white hover:bg-blue-500 p-2.5 rounded-lg"
              >
                <button>Resume</button>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Skills */}
      <div className="w-full flex lg:flex-col flex-wrap justify-center items-center lg:gap-2 gap-4">
        <h2 className="text-xl font-bold font-display text-[#43474C]">Skills</h2>
        <div className="flex lg:flex-wrap flex-nowrap justify-center xl:gap-8 gap-4">
          <ul className="flex flex-wrap lg:gap-16 gap-4 list-none w-full justify-center">
            <li>
              <img
                src="https://skillicons.dev/icons?i=html,css&theme=dark"
                alt="HTML and CSS"
              />
            </li>
            <li>
              <img
                src="https://skillicons.dev/icons?i=javascript,typescript&theme=dark"
                alt="JavaScript and TypeScript"
              />
            </li>
          </ul>
          <ul className="flex flex-wrap lg:gap-16 gap-4 list-none w-full justify-center">
            <li>
              <img
                src="https://skillicons.dev/icons?i=react,tailwind&theme=dark"
                alt="React and Tailwind"
              />
            </li>
            <li>
              <img
                src="https://skillicons.dev/icons?i=nodejs,express&theme=dark"
                alt="Node.js and Express"
              />
            </li>
          </ul>
          <ul className="flex flex-wrap lg:gap-16 gap-4 list-none w-full justify-center">
            <li>
              <img
                src="https://skillicons.dev/icons?i=java,kotlin&theme=dark"
                alt="Java and Kotlin"
              />
            </li>
            <li>
              <img
                src="https://skillicons.dev/icons?i=python,fastapi&theme=dark"
                alt="Python and FastAPI"
              />
            </li>
          </ul>
          <ul className="flex flex-wrap lg:gap-16 gap-4 list-none w-full justify-center">
            <li>
              <img
                src="https://skillicons.dev/icons?i=aws,redis&theme=dark"
                alt="AWS and Redis"
              />
            </li>
            <li>
              <img
                src="https://skillicons.dev/icons?i=firebase,gcp&theme=dark"
                alt="Firebase and GCP"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
