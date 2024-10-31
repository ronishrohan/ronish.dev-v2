import React, { createRef, ReactNode, useEffect, useState } from "react";
import TextAppearWords from "../../components/Text/TextAppearWords";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import TextAppearUp from "../../components/Text/TextAppear";

const serviceList = [
  {
    title: "websites",
    description:
      "Designing and developing fully responsive and visually stunning websites that align with your brand’s identity and engage your target audience. From concept to launch, I ensure every website is optimized for performance, accessibility, and SEO to enhance user experience and drive traffic to your business.",
  },
  {
    title: "mockups",
    description:
      "Creating detailed, high-quality mockups that bring your ideas to life, showcasing potential layouts, color schemes, and visual elements before development. My mockups allow for valuable feedback and adjustments early in the design process, ensuring that the final product aligns perfectly with your vision and brand aesthetics.",
  },
  {
    title: "prototype",
    description:
      "Developing interactive prototypes that simulate user experience and interface functionalities, enabling you to see the flow and feel of the final product before full development. This step is crucial in refining user interactions, optimizing design choices, and addressing potential usability issues, ultimately saving time and resources.",
  },
  {
    title: "apps",
    description:
      "Building high-performance, user-friendly mobile and web applications tailored to your needs, with a focus on clean code, seamless functionality, and intuitive design. I ensure that each app runs smoothly across multiple devices, delivering a consistent and satisfying user experience for all users.",
  },
  {
    title: "backends",
    description:
      "Developing robust, secure, and scalable backend systems to support your applications, manage data, and provide seamless functionality. From API development to database management, I create backends that integrate efficiently with your frontend, ensuring reliability, speed, and security for your application’s users.",
  },
];

const Services = () => {
  const wrapperRef = createRef<HTMLDivElement>();
  const w2 = createRef<HTMLDivElement>();
  const s1 = useScroll({ target: wrapperRef, offset: ["0 0", "0.2 0"] });
  const actualScroll = useScroll({
    target: wrapperRef,
    offset: ["0.2 0", "1 1"],
  });
  const s_s1 = useSpring(s1.scrollYProgress, { stiffness: 400, damping: 30 });
  const scale = useTransform(s_s1, [0, 1], ["50%", "100%"]);

  const s2 = useScroll({ target: w2, offset: ["0 1", "0 0"] });
  const s_s2 = useSpring(s2.scrollYProgress, { stiffness: 400, damping: 30 });
  const tImageY = useTransform(s_s2, [0, 1], ["200%", "0%"]);
  const scrollInner = useTransform(
    actualScroll.scrollYProgress,
    [0, 1],
    ["0", "-100%"]
  );

  const [widgetEnabled, setWidgetEnabled] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);

  return (
    <section id="services" className="h-fit w-screen  flex flex-col">
      <div className="h-[1px] w-full bg-black mt-10 mb-4"></div>
      <div className="text-center w-full text-[13vw] leading-[14vw] flex gap-[4vw] justify-center">
        WHAT I{" "}
        <span className="italic">
          <TextAppearWords>OFFER</TextAppearWords>
        </span>
      </div>
      <div ref={wrapperRef} className="h-[400vh] flex relative gap-4 ">
        <div
          ref={w2}
          className="h-screen w-full overflow-hidden flex items-center justify-center sticky top-0"
        >
          <motion.div
            style={{ width: scale, height: scale, y: tImageY }}
            className="absolute overflow-hidden flex flex-col justify-end"
          >
            <motion.img
              src="/images/stayhard.png"
              alt=""
              className="absolute  brightness-50 object-cover"
            />
            <motion.div
              style={{ y: scrollInner, opacity: s1.scrollYProgress }}
              className="text-[10vw] justify-center px-4 whitespace-nowrap leading-[10vw] text-white font-bold z-30 size-full absolute top-3/4 flex flex-col items-start"
            >
              {serviceList.map((service, index) => {
                return (
                  <ServiceButton
                    key={index + service.title}
                    setEnableWidget={setWidgetEnabled}
                    onHover={() => setCurrent(index)}
                  >
                    {service.title.toUpperCase()}
                  </ServiceButton>
                );
              })}

              <HoverInfo current={current} enabled={widgetEnabled}></HoverInfo>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HoverInfo = ({
  enabled,
  current,
}: {
  enabled: boolean;
  current: number;
}) => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const maxY = window.innerHeight;
      setPos({ x: e.clientX, y: (e.clientY * 50) / maxY - 25 });
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  });
  return (
    <AnimatePresence>
      <motion.div
        animate={{ y: `${pos.y}%`, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.2,
          ease: "circOut",
        }}
        className="h-full pointer-events-none w-full flex flex-col justify-center items-end absolute right-0 top-0"
      >
        <AnimatePresence>
          {enabled && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "circOut",
                opacity: {
                  duration: 0.2,
                },
              }}
              className="h-1/2 w-1/2 bg-black m-4 shadow-lg shadow-black text-wrap rounded-lg border border-white/20 flex flex-col p-4 font-light text-[2vw] leading-[2vw]"
            >
              <AnimatePresence mode="wait">
                {enabled && (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                    <TextAppearWords key={serviceList[current].title}>
                      {serviceList[current].description}
                    </TextAppearWords>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

const ServiceButton = ({
  children,
  setEnableWidget,
  onHover,
}: {
  children: ReactNode;
  setEnableWidget: Function;
  onHover: Function;
}) => {
  return (
    <button
      onMouseEnter={() => {
        setEnableWidget(true);
        onHover();
      }}
      onMouseLeave={() => setEnableWidget(false)}
      className="cursor-default hover:text-red-600 transition-colors"
    >
      <TextAppearWords>{children}</TextAppearWords>
    </button>
  );
};

export default Services;
