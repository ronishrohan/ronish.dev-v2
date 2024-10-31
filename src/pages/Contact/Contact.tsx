import {
  useScroll,
  motion,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import React, { createRef, RefObject, useEffect, useState } from "react";
import { icons } from "../../util/icons";
import { useSetAtom } from "jotai";
import { expandedAtom } from "../../store/cursorStore";

const Contact = () => {
  const ghostRef: RefObject<HTMLDivElement> = createRef();
  const scroll = useScroll({ target: ghostRef, offset: ["0 0.5", "1 1"] });
  const [translate, setTranslate]: [number, Function] = useState(100);
  const [simple, setSimple]: [number, Function] = useState(0);
  const emailInput = createRef<HTMLInputElement>();

  const smoothedScroll = useSpring(scroll.scrollYProgress, {
    stiffness: 400,
    damping: 30,
  });

  useMotionValueEvent(smoothedScroll, "change", (latest) => {
    setTranslate((100 - latest * 100) * 4);
    setSimple(latest);
  });

  return (
    <>
      <div
        
        ref={ghostRef}
        id="contact"
        className="h-[100vh] w-screen bg-transparent z-20 pointer-events-none"
      ></div>
      <div className="h-[100vh] w-screen -z-10 p-4 justify-end fixed bottom-0 flex flex-col pt-10 bg-black text-white">
        <motion.div
          style={{ opacity: scroll.scrollYProgress }}
          className="text-[13vw] leading-[13vw]  font-medium shrink-0 w-full text-center flex justify-center"
        >
          {"RONISH ROHAN".split("").map((letter, index) => {
            return (
              <>
                <motion.div
                  className="hover:text-orange-500 transition-colors duration-300 ease-out"
                  style={{ y: `${translate / (index - 12)}%` }}
                >
                  {letter == " " ? "\u00A0" : letter}
                </motion.div>
              </>
            );
          })}
        </motion.div>
        <motion.div
          style={{ width: `${100 - translate / 4}%` }}
          className=" h-[1px] bg-white shrink-0"
        ></motion.div>
        <motion.div
          style={{ opacity: simple, y: (1 - simple) * -20 }}
          className="mt-4 shrink-0 flex gap-4 h-[4vw] items-center"
        >
          <div className="text-[2vw] shrink-0">SEND ME AN EMAIL</div>
          <input
            ref={emailInput}
            onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            placeholder="EXAMPLE@GMAIL.COM"
            type="text"
            className="rounded-lg w-full text-[2vw] text-orange-500 placeholder:text-white/30 bg-black border-0 outline-none"
          />
          <button className="h-full text-[2vw] hover:text-orange-500 ">
            SEND
          </button>
        </motion.div>
        <div className="size-full flex gap-4 my-4 items-end">
          <motion.div style={{ y: `${100-(simple*100)}%`, height: `${Math.max(75,simple*100)}%`, opacity: simple }} className="overflow-hidden w-2/3 h-full gap-4 shrink-0 flex flex-col">
            <div className="size-full flex gap-4">
              <ContactButton description="I post my art here" title="Instagram"></ContactButton>
              <ContactButton description="You can contact me here, always active :/" title="Discord"></ContactButton>
              <ContactButton description="My linkedin profile" title="Linkedin"></ContactButton>
            </div>
            <div className="size-full flex gap-4">
              <ContactButton description="Send me mail or something idk" title="Gmail"></ContactButton>
              <ContactButton description="Where I shitpost" title="Reddit"></ContactButton>
              <ContactButton description="All my repositories are here, feel free to check them out" title="Github"></ContactButton>
            </div>
          </motion.div>
          <motion.div
            style={{ scale: `${Math.max(75, simple * 100)}%`, opacity: simple }}
            className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center relative"
          >
            <img
              src="/images/kitchen.jpg"
              className="absolute size-full object-cover"
              alt=""
            />
          </motion.div>
        </div>
        <motion.div style={{opacity: simple}} className="mt-auto w-full shrink-0 flex text-white/60 font-normal gap-2">
          <div>© 2024 Ronish Rohan</div>
          <div>All rights reserved.</div>
          <div className="ml-auto">created using react</div>
        </motion.div>
      </div>
    </>
  );
};

const ContactButton = ({ title, description }: { title: string, description: string }) => {
  const setExpanded = useSetAtom(expandedAtom)
  return (
    <button onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)} className="cursor-none size-full overflow-hidden border group hover:fill-black relative fill-white flex-col transition-colors border-white/40 rounded-lg flex items-start justify-start p-4 hover:bg-white hover:text-black">
      {title}
      <div className="text-black font-normal text-left">{description}</div>
      <div className="absolute bottom-0 right-0 size-[2vw] m-4 rotate-45 group-hover:rotate-0 transition-transform ">
        {icons.arrow}
      </div>
    </button>
  );
};

export default Contact;
