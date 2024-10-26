import React, { PropsWithChildren, useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <header className="sticky top-0 h-12 border-b-2 border-black flex items-center">
      <div className="text-2xl font-medium m-2">ronish.dev</div>
      <div className="ml-auto flex h-full w-fit">
        <Divider />
        <Button title="About"></Button>
        <Divider />
        <Button title="Work"></Button>
        <Divider />
        <Button title="Services"></Button>
        <Divider />
        <Button title="Contact"></Button>
      </div>
    </header>
  );
};

type ButtonProps = {
  title: string;
};

const Divider = () => <div className="w-0.5 h-full bg-black"></div>

const Button = (button: ButtonProps) => {
  const [hovered, setHovered]: [boolean, Function] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden h-full px-4 flex font-medium items-center justify-center"
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
        className="absolute size-full bottom-0 overflow-hidden bg-black text-white flex items-center justify-center"
      >
        {button.title}
      </motion.div>
    </button>
  );
};

export default Navbar;
