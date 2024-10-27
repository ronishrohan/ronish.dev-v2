import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="h-screen w-full p-4 flex flex-col">
      <div className="h-[1px] bg-black w-full"></div>
      <div className="mt-10 items-center overflow-hidden flex gap-4 shrink-0">
        <p className=" text-[2.4vw] leading-[2.4vw]  font-normal ">
          I'm Ronish Rohan, a Computer Science student from India with a passion
          for creating purposeful and elegant interfaces. Skilled in React.js,
          Next.js, Framer Motion, Tailwind CSS, and Flutter , I focus on
          building responsive, immersive experiences across web and mobile. My
          approach combines frontend expertise with backend insight to craft
          seamless, impactful user journeys.
        </p>
        <div className="h-full w-[20vw] text-j shrink-0 rounded-lg overflow-hidden bg-black flex items-start justify-center  relative">
          <img
            src="https://media1.tenor.com/m/iepOJafTgJ0AAAAC/meimei-mei.gif"
            className="w-full absolute object-cover "
            alt=""
          />
        </div>
      </div>
      <div className="h-full flex  gap-4 mt-10">
        <div className="flex h-full w-1/2 gap-4">
          <Info
            info={
              <>
                <div>CMR Institute of Technology</div>
                <div>Pursuing B.Tech in Computer Science</div>
                <div className="text-white/50">2024-2027</div>
              </>
            }
          >
            Education
          </Info>

          <Info
            info={
              <>
                <div>React - The Complete Guide 2024</div>
                <div>Udemy</div>
                <div className="text-white/50">Dec 24, 2023</div>
                <div>React Native - The Practical Guide</div>
                <div>Udemy</div>
                <div className="text-white/50">June 25, 2024</div>
              </>
            }
          >
            Certificates
          </Info>
        </div>
        <div className="flex flex-col h-full w-1/4 gap-4">
          <div className="h-1/2 w-full p-4">
            <div className="rounded-full size-full border-4 border-black/10"></div>
          </div>
          <Info
            onClick={() =>
              window.open("https://github.com/ronishrohan", "_blank")
            }
            info={
              <>
                <div>Here's what I offer</div>
              </>
            }
          >
            Services
          </Info>
        </div>
        <div className="flex items-start h-full w-1/4 gap-4">
          <Info
            onClick={() =>
              window.open("https://github.com/ronishrohan", "_blank")
            }
            info={
              <>
                <div>Take a look at my projects</div>
              </>
            }
          >
            Projects
          </Info>
        </div>
      </div>
    </section>
  );
};

const Info = ({
  children,
  info,
  onClick,
}: {
  children: ReactNode;
  info: ReactNode;
  onClick?: Function;
}) => {
  const [hovered, setHovered]: [boolean, Function] = useState(false);

  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-1/2 p-2 w-full hover:bg-black hover:text-white overflow-hidden transition-colors border-2 rounded-lg border-black/20"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: hovered ? "-5.5vh" : 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="flex w-full shrink-0 text-2xl font-medium absolute"
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ y: "5.5vh" }}
        animate={{ y: hovered ? 0 : "5.5vh" }}
        transition={{ duration: 0.4, ease: "circOut" }}
        className="size-full h-fit flex flex-col text-white"
      >
        {info}
      </motion.div>
      <div className="absolute size-fit bottom-0 right-0" >
        
      </div>
    </motion.div>
  );
};

export default About;
