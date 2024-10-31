import { useLenis } from "lenis/react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NavbarMobile = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setEnabled(true)}
        className="fixed rounded-lg top-0 right-0 m-4 size-12 z-50 gap-1 flex flex-col items-center justify-center border-2 border-black/10 p-4 bg-white"
      >
        <div className="h-[2px] w-full bg-black"></div>
        <div className="h-[2px] w-full bg-black"></div>
        <div className="h-[2px] w-full bg-black"></div>
      </button>

      <AnimatePresence>
        {enabled && (
          <>
            <div
              onClick={() => setEnabled(false)}
              className="z-50 bg-black/10 fixed size-full"
            ></div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75vw" }}
              exit={{ width: 0 }}
              transition={{ duration: 0.2, ease: "circOut" }}
              className="overflow-hidden fixed z-[60] right-0 top-0 h-full bg-white/80 backdrop-blur-md  shadow-2xl shadow-black/80 flex flex-col"
            >
              <div className="flex flex-col p-4 h-full">
                <div className="flex gap-2 items-center">
                  <img src="/icon.svg" alt="" className="size-8" />
                  <div className="font-medium text-2xl">ronish.dev</div>
                </div>
                <div className="flex flex-col mt-4">
                  <Divider />
                  <Button title="About"></Button>
                  <Divider />
                  <Button title="Work"></Button>
                  <Divider />
                  <Button title="Services"></Button>
                  <Divider />
                  <Button title="Contact"></Button>
                </div>
                <div className="mt-auto text-[3vw]">© 2024 Ronish Rohan</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const Divider = () => <div className="w-full h-[1px] bg-black"></div>;

export const Button = (button: { title: string }) => {
  const [hovered, setHovered]: [boolean, Function] = useState(false);
  const lenis = useLenis();

  function handleClick() {
    lenis?.scrollTo(`#${button.title.toLowerCase()}`);
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden h-full py-4 flex font-normal items-center justify-start"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: hovered ? "-60%" : 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
      >
        {button.title}
      </motion.div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: hovered ? "100%" : 0 }}
        transition={{ duration: 0.2, ease: "circOut" }}
        className="absolute size-full bottom-0 overflow-hidden bg-black text-white flex items-center justify-start"
      >
        {button.title}
      </motion.div>
    </button>
  );
};

export default NavbarMobile;
