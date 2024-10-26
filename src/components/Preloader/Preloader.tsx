import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PreloaderProps = {
  hasLoaded: Function;
};

const Preloader = (preloader: PreloaderProps) => {
  const [loaded, setLoaded]: [boolean, Function] = useState(false);
  const [timer, setTimer]: [number, Function] = useState(0);

  useEffect(() => {
    function updateTimer() {
      const rand = Math.round(Math.random() * 5);
      setTimer((prev: number) => {
        if (prev + rand > 100) {
          preloader.hasLoaded();
          setLoaded(true)
          return 100;
        } else {
          return prev + rand;
        }
      });
      const randomTime = Math.random() * 200 + 50;
      setTimeout(updateTimer, randomTime);
    }

    updateTimer();
    console.log(timer);
  }, []);
  return (
    <motion.div
      initial={{ height: "100%" }}
      animate={{ height: loaded ? "0%" : "100%" }}
      transition={{duration: 0.5, ease: "circInOut"}}
      className="fixed w-full overflow-hidden bg-black text-white flex z-50 items-center justify-center"
    >
      <div className="absolute bottom-0 right-0 m-4 text-[14vw] leading-[14vw]">
        {timer}%
      </div>
    </motion.div>
  );
};

export default Preloader;
