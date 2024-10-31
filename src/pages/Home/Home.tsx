import {
  createRef,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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

  const [nameHovered, setNameHovered]: [boolean, Function] = useState(false);

  const pageRef = createRef<HTMLDivElement>();

  const scroll = useScroll({ target: pageRef, offset: ["1 1", "1 0"] });

  const scrollMotionValue = useSpring(scroll.scrollYProgress, {
    stiffness: 400,
    damping: 30,
  });

  const [scrollp, setScrollp] = useState<number>(0);

  useMotionValueEvent(scrollMotionValue, "change", (latest) => {
    console.log(latest);
    setScrollp(latest);
  });

  const setExpanded: Function = useSetAtom(expandedAtom);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={pageRef}
      data-scroll-section
      id="home"
      className="size-full hidden sm:flex h-[100vh] z-20 font-montreal  flex-col items-center justify-center p-4"
    >
      <div className="flex flex-col w-full select-none h-fit text-[10vw] font-medium leading-[10vw]">
        <div className="w-full flex">
          <motion.div
            style={{ x: scrollp * -100 }}
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
          </motion.div>
        </div>
        <motion.div
          style={{ x: scrollp * -200 }}
          className="w-full text-center flex justify-center"
        >
          <TextAppearUp delay={0.2}>THIS IS</TextAppearUp>
        </motion.div>
        <motion.div style={{ x: scrollp * 200 }} className="w-full flex">
          <div
            className="ml-auto group flex items-center justify-center relative"
            onMouseEnter={() => {
              setNameHovered(true);
              setExpanded(true);
            }}
            onMouseLeave={() => {
              setExpanded(false);
              setNameHovered(false);
            }}
          >
            <TextAppearUp delay={0.5}>RONISH</TextAppearUp>
            <PeekImage hovered={nameHovered}></PeekImage>
          </div>
        </motion.div>
        <motion.div
          style={{ x: scrollp * 120 }}
          className="w-full flex justify-start"
        >
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
        </motion.div>
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

const PeekImage = ({ hovered }: { hovered: boolean }) => {
  return (
    <>
      <div className="w-[10vw]  h-[20vw] z-0 translate-y-[-50%]  absolute flex items-end justify-center -top-[9vw] overflow-hidden">
        <motion.div
          initial={{ y: "50%", opacity: 0 }}
          animate={{ y: hovered ? "15%" : "24%", opacity: 1 }}
          transition={{ duration: 1, ease: "circInOut", delay: 0.7 }}
          className="flex group justify-center items-center"
        >
          <div className="bg-white pointer-events-none group-hover:pointer-events-auto group-hover:scale-100 transition-all opacity-0 group-hover:opacity-100 scale-90 border-2 border-black/20 w-[100%] h-[6vw] rounded-lg top-[-20%] absolute p-2 flex items-center justify-center text-[1vw] font-normal">
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
