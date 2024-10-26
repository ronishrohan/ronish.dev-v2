import React, { PropsWithChildren, ReactNode } from "react";
import { motion } from "framer-motion";

const TextAppearUp = ({ children, delay }: { children: ReactNode | null, delay: number }) => {
  children = children ?? "";
  return (
    <div className="flex">
      {children
        .toString()
        .split("")
        .map((char, index) => {
          return (
            <div className="size-fit overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.6,
                  delay: delay + index * 0.035,
                  ease: "circOut",
                }}
                key={children.toString() + index}
              >
                {char == " " ? "\u00A0" : char}
              </motion.div>
            </div>
          );
        })}
    </div>
  );
};

const Home = () => {
  return (
    <section className="size-full font-montreal flex flex-col items-center justify-center p-4">
      <div className="flex flex-col w-full select-none h-fit text-[10vw] font-medium leading-[10vw]">
        <div className="w-full text-left">
          <TextAppearUp delay={0} >WELCOME</TextAppearUp>
        </div>
        <div className="w-full text-center flex justify-center"><TextAppearUp delay={0.2}>THIS IS</TextAppearUp></div>
        <div className="w-full flex">
          <div className="ml-auto flex items-center justify-center relative">
            <div className="size-[10vw] -z-10 absolute -top-[9vw] overflow-hidden">
              <motion.img
                initial={{ y: "10%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1, ease: "circInOut", delay: 1.5 }}
                src="/images/ronish.png"
                className="object-cover"
                alt=""
              />
              <div className="pointer-events-none absolute bottom-0 h-[10%] bg-gradient-to-t from-white to-transparent w-full"></div>
            </div>
            <TextAppearUp delay={0.5}>RONISH</TextAppearUp>
          </div>
        </div>
        <div className="w-full text-center"><TextAppearUp delay={0.3}>A DEVELOPER.</TextAppearUp></div>
      </div>
    </section>
  );
};

export default Home;
