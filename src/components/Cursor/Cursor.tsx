import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { enabledAtom, expandedAtom } from "../../store/cursorStore";

const Cursor = () => {
  const enabled: boolean = useAtomValue(enabledAtom);
  const expanded : boolean = useAtomValue(expandedAtom);
  const [pos, setPos]: [{ x: number; y: number }, Function] = useState({
    x: 0,
    y: 0,
  });
  
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          x: `calc(${pos.x}px - 1vw)`,
          y: `calc(${pos.y}px - 1vw)`,
          scale: enabled ? (expanded ? 2 : 1) : 0,
        }}
        transition={{ duration: 0.5, ease: "circOut", scale: {
          duration: 0.5, ease: "circOut"
        } }}
        className=" fixed top-0 left-0 pointer-events-none rounded-full border-2 border-white  z-[100] mix-blend-difference size-[2vw] flex items-center justify-center"
      ></motion.div>
    </AnimatePresence>
  );
};

export default Cursor;
