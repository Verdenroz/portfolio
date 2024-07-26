

const Contact = () => {
  return (
    <div className="flex flex-col w-full items-center justify-between">
      <h1 className="w-full text-3xl text-left font-black font-display text-white mt-4">
        Contact Me
      </h1>
      <p className="text-lg text-white mt-4">
        I'm always open to new opportunities. Feel free to contact me through
        any of the platforms below. I'll be happy to get in touch!
      </p>
      <ul className="flex flex-wrap gap-4 lg:flex-row xl:gap-16 lg:gap-8 mt-2 w-full justify-start">
        <li>
        <div className="flex items-center space-x-4 p-2 hover:shadow-lg hover:shadow-blue-500/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 512 512"
              width="36"
              height="36"
              viewBox="0 0 512 512"
              id="phone"
            >
              <path
                fill="#ffffff"
                d="M340.4,0h-170c-30.3,0-55,24.7-55,55V457c0,30.3,24.7,55,55,55h170c30.3,0,55-24.7,55-55V55
	C395.4,24.7,370.8,0,340.4,0z M234.7,22.6h42.2c4.9,0,8.8,4.5,8.8,10s-3.9,10-8.8,10h-42.2c-4.9,0-8.8-4.5-8.8-10
	S229.8,22.6,234.7,22.6z M194.8,21.1c6.3,0,11.5,5.1,11.5,11.5S201.1,44,194.8,44c-6.3,0-11.5-5.1-11.5-11.5S188.4,21.1,194.8,21.1z
	 M255.8,477.1c-10.2,0-18.4-8.2-18.4-18.4c0-10.2,8.2-18.4,18.4-18.4s18.4,8.2,18.4,18.4C274.2,468.9,266,477.1,255.8,477.1z
	 M363.4,429.5H147.5V66.6h215.9V429.5z"
              ></path>
            </svg>
            <p className="text-white font-light">+1 (631) 383-8305</p>
          </div>
        </li>
        <li>
        <div className="flex items-center space-x-4 p-2 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer">
            <a
              target="_blank"
              href="mailto:harveytseng2@gmail.com"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="36"
                height="36"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4caf50"
                  d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
                ></path>
                <path
                  fill="#1e88e5"
                  d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
                ></path>
                <polygon
                  fill="#e53935"
                  points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
                ></polygon>
                <path
                  fill="#c62828"
                  d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
                ></path>
                <path
                  fill="#fbc02d"
                  d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
                ></path>
              </svg>
            </a>
            <a
              target="_blank"
              href="mailto:harveytseng2@gmail.com"
              rel="noreferrer"
              aria-label="Email"
            >
              <p className="text-white font-light">harveytseng2@gmail.com</p>
            </a>
          </div>
        </li>
        <li>
        <div className="flex items-center space-x-4 p-2 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/harvey-tseng/"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="36"
                height="36"
                viewBox="0 0 50 50"
                className="fill-blue-500 hover:fill-white"
              >
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
            </a>
            <p className="text-white font-light">
              linkedin.com/in/harvey-tseng
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
