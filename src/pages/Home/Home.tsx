import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import { enabledAtom, expandedAtom } from "../../store/cursorStore";
import TextAppearUp from "../../components/Text/TextAppear";


const Home = () => {
  const [mousePos, setMousePos]: [{ x: number; y: number }, Function] =
    useState({ x: 0, y: 0 });
  const [welcomeHovered, setWelcomeHovered]: [boolean, Function] =
    useState(false);

  const [developerHovered, setDeveloperHovered]: [boolean, Function] =
    useState(false);

  const setExpanded: Function = useSetAtom(expandedAtom);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="size-full font-montreal flex flex-col items-center justify-center p-4">
      <div className="flex flex-col w-full select-none h-fit text-[10vw] font-medium leading-[10vw]">
        <div className="w-full flex">
          <div
            onMouseEnter={() => setWelcomeHovered(true)}
            onMouseLeave={() => setWelcomeHovered(false)}
            className="mr-auto group"
          >
            <HoverImage
              image={"/images/folded_hands_emoji.png"}
              hovered={welcomeHovered}
              pos={mousePos}
            ></HoverImage>
            <TextAppearUp delay={0}>NAMASTE</TextAppearUp>
          </div>
        </div>
        <div className="w-full text-center flex justify-center">
          <TextAppearUp delay={0.2}>THIS IS</TextAppearUp>
        </div>
        <div className="w-full flex">
          <div
            className="ml-auto group flex items-center justify-center relative"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
          >
            <TextAppearUp delay={0.5}>RONISH</TextAppearUp>
            <PeekImage></PeekImage>
          </div>
        </div>
        <div className="w-full flex justify-start">
          <div
            onMouseEnter={() => setDeveloperHovered(true)}
            onMouseLeave={() => setDeveloperHovered(false)}
          >
            <HoverImage
              image={"/images/man_developer_emoji.png"}
              hovered={developerHovered}
              pos={mousePos}
            ></HoverImage>
            <TextAppearUp delay={0.3}>A DEVELOPER.</TextAppearUp>
          </div>
        </div>
      </div>
    </section>
  );
};

const HoverImage = ({
  hovered,
  pos,
  image,
}: {
  hovered: boolean;
  pos: { x: number; y: number };
  image: string;
}) => {
  const setEnabled: Function = useSetAtom(enabledAtom);
  useEffect(() => {
    if (hovered) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }, [hovered]);

  return (
    <>
      <motion.img
        initial={{
          scale: 0,
        }}
        animate={{
          scale: hovered ? 1 : 0,
          x: `calc(${pos.x}px - 5vw)`,
          y: `calc(${pos.y}px - 5vw)`,
        }}
        transition={{
          duration: 0.5,
          ease: "circOut",
        }}
        src={image}
        className=" fixed top-0 left-0 pointer-events-none z-20 size-[10vw]"
        alt=""
      />
    </>
  );
};

const PeekImage = () => {
  return (
    <>
      <div className="w-[10vw]  h-[20vw] z-0 translate-y-[-50%]  absolute flex items-end justify-center -top-[9vw] overflow-hidden">
        <motion.div
          initial={{ y: "50%", opacity: 0 }}
          animate={{ y: "24%", opacity: 1 }}
          transition={{ duration: 1, ease: "circInOut", delay: 0.7 }}
          className="flex group justify-center items-center"
        >
          <div className="bg-white group-hover:scale-100 transition-all opacity-0 group-hover:opacity-100 scale-90 border-2 border-black/20 w-[100%] h-[6vw] rounded-lg top-[-20%] absolute p-2 flex items-center justify-center text-[1vw] font-normal">
            Nice to meet you :)
          </div>
          <motion.img
            src="/images/ronish.png"
            className="object-cover"
            alt=""
          />
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 h-[10%] bg-gradient-to-t from-white to-transparent w-full"></div>
      </div>
    </>
  );
};

export default Home;
