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
  { title: "WEATHER", image: "/projects/weather.png" },
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
    <section id="work" data-scroll-section className=" h-fit w-screen z-20 flex flex-col p-4 pt-10">
      <div className="h-[1px] bg-black w-full"></div>
      <TextSlider></TextSlider>
      <div className="h-[80vh] w-full flex gap-10">
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
          current={active}
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
  current: number;
}) => {
  return (
    <>
      <div
        ref={props.imageContainer}
        className="h-full w-[60vw] shrink-0 flex items-center justify-start rounded-lg overflow-hidden bg-black  relative "
      >
        <motion.div
          animate={{ y: `-${props.current * 100}%` }}
          transition={{ duration: 0.5, ease: "circInOut" }}
          className="size-full flex flex-col"
        >
          {projects.map((project, index) => {
            return (
              <>
                <motion.div
                  key={index + project.title}
                  style={{ y: props.imageParallaxY }}
                  className="h-full overflow-hidden shrink-0 w-[60vw] flex items-center justify-center"
                >
                  <img
                    src={project.image}
                    className="absolute size-full object-cover scale-y-105"
                    alt=""
                  />
                </motion.div>
              </>
            );
          })}
        </motion.div>
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
  const firstText = createRef<HTMLDivElement>();
  const secondText = createRef<HTMLDivElement>();

  useEffect(() => {
    const duration = 10;

    if (firstText.current && secondText.current) {
      
      const tween = gsap.to([firstText.current, secondText.current], {
        xPercent: -100,
        ease: "none",
        repeat: -1,
        overwrite: "auto",
        duration,
        modifiers: {
          xPercent: (xPercent) => {
            return `${parseFloat(xPercent) % 100}`;
          },
        },
      });

      gsap.ticker.add(() => {
        tween.progress((tween.progress() + 0.001) % 1);
      });

      // Optional cleanup
      
    }
  }, []);

  return (
    <div className="flex text-[15vw] font-normal shrink-0 whitespace-nowrap relative w-fit">
      <div className="" ref={firstText}>
        MY WORKS MY WORKS&nbsp;
      </div>
      <div ref={secondText} className="left-full absolute">
        MY WORKS MY WORKS&nbsp;
      </div>
    </div>
  );
};

export default Work;
