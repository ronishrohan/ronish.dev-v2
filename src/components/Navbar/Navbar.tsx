import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import { enabledAtom, expandedAtom } from "../../store/cursorStore";
import { useLenis } from "lenis/react";

const Navbar = () => {
  const lenis = useLenis();
  const setEnabled: Function = useSetAtom(enabledAtom);
  const setExpanded: Function = useSetAtom(expandedAtom);

  useEffect(() => {
    lenis?.scrollTo(20)
  })
  return (
    <motion.header
      initial={{ height: "0px" }}
      animate={{ height: "48px" }}
      transition={{ delay: 0.7, duration: 0.9, ease: "circInOut" }}
      className="fixed w-full top-0 overflow-hidden bg-white/90 backdrop-blur-sm z-50 border-b-[1px] border-black flex items-center"
    >
      <button
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onClick={() => lenis?.scrollTo("#home")}
        className="text-2xl font-medium m-2 gap-2 flex items-center"
      >
        <img src="/icon.svg"  alt="" className="size-8" />
        <div>ronish.dev</div>

      </button>
      <div
        onMouseEnter={() => setEnabled(false)}
        onMouseLeave={() => setEnabled(true)}
        className="ml-auto flex h-full w-fit"
      >
        <Divider />
        <Button title="About"></Button>
        <Divider />
        <Button title="Work"></Button>
        <Divider />
        <Button title="Services"></Button>
        <Divider />
        <Button title="Contact"></Button>
      </div>
    </motion.header>
  );
};

type ButtonProps = {
  title: string;
};

const Divider = () => <div className="w-[1px] h-full bg-black"></div>;

const Button = (button: ButtonProps) => {
  const [hovered, setHovered]: [boolean, Function] = useState(false);
  const lenis = useLenis()


  function handleClick(){
    lenis?.scrollTo(`#${button.title.toLowerCase()}`)
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden h-full px-4 flex font-normal items-center justify-center"
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
