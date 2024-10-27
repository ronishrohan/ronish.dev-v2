import gsap from "gsap";
import {
  createRef,
  ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useLenis } from "lenis/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSetAtom } from "jotai";
import { expandedAtom } from "../../store/cursorStore";

const projects = [
  { title: "WAFFLE", image: "/projects/waffle.png" },
  { title: "LYRCTYPE", image: "/projects/lyrc.png" },
  { title: "PRTFLIO", image: "/projects/portfolio.png" },
  { title: "PAYPEEK", image: "/projects/paypeek.png" },
  { title: "CALCULATOR", image: "/projects/calculator.png" },
  { title: "REDDIT CLONE", image: "/projects/reddit.png" },
];

const Work = () => {
  const setExpanded: Function = useSetAtom(expandedAtom);
  const imageContainer: RefObject<HTMLDivElement> = createRef();
  const scrollImage = useScroll({
    target: imageContainer,
    offset: ["0 1", "1 0"],
  });
  const imageParallaxY = useTransform(
    scrollImage.scrollYProgress,
    [0, 1],
    ["5%", "-5%"]
  );

  const [active, setActive]: [number, Function] = useState(0);
  return (
    <section className=" h-fit w-screen flex flex-col p-4 mt-10">
      <div className="h-[1px] bg-black w-full"></div>
      <TextSlider></TextSlider>
      <div className="h-[60vh] w-full flex gap-10">
        <div
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          className="h-full w-full flex flex-col border-t border-black"
        >
          {projects.map((project, index) => {
            return (
              <WorkButton
                key={index + project.title}
                index={index}
                title={project.title}
                onHover={() => setActive(index)}
              ></WorkButton>
            );
          })}
        </div>
        <WorkCarousel
          imageContainer={imageContainer}
          imageParallaxY={imageParallaxY}
        ></WorkCarousel>
      </div>
    </section>
  );
};

const WorkCarousel = (props: {
  imageContainer: RefObject<HTMLDivElement>;
  imageParallaxY: any;
}) => {
  return (
    <>
      <div
        ref={props.imageContainer}
        className="h-full w-[60vw] shrink-0 flex items-center justify-start rounded-lg bg-black overflow-hidden relative "
      >
        <div className="size-full flex translate-x-[-100%]">
          {projects.map((project, index) => {
            return (
              <>
                <motion.div
                  key={index + project.image}
                  style={{ y: props.imageParallaxY }}
                  className="h-full overflow-hidden shrink-0 w-[60vw] flex items-center justify-center"
                >
                  <img
                    src={project.image}
                    className="absolute size-full object-cover scale-105"
                    alt=""
                  />
                </motion.div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const WorkButton = ({
  index,
  title,
  onHover,
}: {
  index: Number;
  title: String;
  onHover: Function;
}) => {
  const [hovered, setHovered]: [boolean, Function] = useState(false);

  useEffect(() => {
    if (hovered) {
      onHover();
    }
  }, [hovered]);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="size-full border-b border-black flex items-center justify-center font-medium text-[2vw] relative"
    >
      <div className="flex z-10 size-full px-2">
        <div className="mr-10 text-black/70">{index as ReactNode}</div>
        <div>{title.toUpperCase() as ReactNode}</div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="bg-black z-20 px-2 text-white flex pointer-events-none absolute  size-full"
      >
        <div className="mr-10 text-white/70">{index as ReactNode}</div>
        <div>{title.toUpperCase() as ReactNode}</div>
      </motion.div>
    </div>
  );
};

const TextSlider = () => {
  const lenis = useLenis();
  const firstText: RefObject<HTMLDivElement> = createRef();
  const secondText: RefObject<HTMLDivElement> = createRef();
  let xPercent: any = 0;
  const [direction, setDirection]: [number, Function] = useState(-1);

  function animate() {
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });

    xPercent += 0.1 * direction;

    

    if (Math.abs(xPercent) > 100) xPercent = 0;

    requestAnimationFrame(animate);
  }
  useEffect(() => {
    animate();
  });
  return (
    <>
      <div className="flex text-[15vw] font-normal shrink-0  whitespace-nowrap relative w-fit">
        <div className="mr-4" ref={firstText}>
          MY WORKS MY WORKS
        </div>
        <div ref={secondText} className="left-full absolute">
          MY WORKS MY WORKS
        </div>
      </div>
    </>
  );
};

export default Work;
