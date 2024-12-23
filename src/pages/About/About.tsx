import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { icons } from "../../util/icons";
import TextAppearWords from "../../components/Text/TextAppearWords";
import { useSetAtom } from "jotai";
import { expandedAtom } from "../../store/cursorStore";

const About = () => {
  return (
    <section
      id="about"
      data-scroll-section
      className="sm:h-fit h-fit w-full z-20 p-4 flex flex-col"
    >
      <div className="h-[1px] bg-black w-full"></div>
      <div className="mt-10 items-center overflow-hidden flex gap-4 shrink-0">
        <div className=" sm:text-[2.4vw] sm:leading-[2.4vw] text-[6vw] leading-[6vw]  font-medium ">
          <TextAppearWords>
            I'm Ronish Rohan, a Computer Science student from India with a
            passion for creating purposeful and elegant interfaces. Skilled in
            React.js, Next.js, Framer Motion, Tailwind CSS, and Flutter , I
            focus on building responsive, immersive experiences across web and
            mobile. My approach combines frontend expertise with backend insight
            to craft seamless, impactful user journeys.
          </TextAppearWords>
        </div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="h-full w-[20vw] hidden sm:flex  shrink-0 rounded-lg overflow-hidden bg-black  items-start justify-center  relative"
        >
          <img
            src="https://media1.tenor.com/m/iepOJafTgJ0AAAAC/meimei-mei.gif"
            className="w-full absolute object-cover "
            alt=""
          />
        </motion.div>
      </div>
      <div className="sm:h-[60vh] hidden mt-4 w-full sm:flex gap-4">
        <div className="h-full w-full flex  gap-4 ">
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
        <div className="h-full w-0 lg:w-1/3 shrink-0 overflow-hidden rounded-lg flex items-center justify-center relative">
          <img
            src="/images/road.jpg"
            className="absolute size-full object-cover"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col h-[60vh] gap-2 mt-4 sm:hidden" >
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
  const setExpanded: Function = useSetAtom(expandedAtom);
  const [hovered, setHovered]: [boolean, Function] = useState(false);

  useEffect(() => {
    setExpanded(hovered);
  }, [hovered]);

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
      className={`relative sm:h-1/2 h-full sm:text-[1vw] text-[4vw] hover:fill-white hover:stroke-white sm:p-2 p-1 w-full hover:bg-black hover:text-white overflow-hidden transition-colors border-2 rounded-lg border-black/20`}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: hovered ? "-5.5vh" : 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="flex w-full shrink-0  font-medium absolute"
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
      {onClick && (
        <div className="bottom-0 right-0 absolute">
          <motion.div
            animate={{ rotate: hovered ? 0 : 45 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className=" size-[3vw]"
          >
            {icons.arrow}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default About;
