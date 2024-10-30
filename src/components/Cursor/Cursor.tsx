import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { enabledAtom, expandedAtom } from "../../store/cursorStore";

const Cursor = () => {
  const enabled: boolean = useAtomValue(enabledAtom);
  const expanded: boolean = useAtomValue(expandedAtom);
  const [pos, setPos]: [{ x: number; y: number }, Function] = useState({
    x: 0,
    y: 0,
  });
  const [prevPos, setPrevPos]: [{ x: number; y: number }, Function] = useState({
    x: 0,
    y: 0,
  });
  const [scale, setScale]: [number, Function] = useState(1);
  const [rot, setRot] : [number, Function] = useState(0);

  useEffect(() => {
    function onMouseMove() {
      // console.log(scale);
      const deltaX = pos.x - prevPos.x;
      const deltaY = pos.y - prevPos.y;

      setPrevPos({ x: pos.x, y: pos.y });

      const speed = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 100)/2;

      const rotLatest = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      setRot(rotLatest)

      setScale(Math.abs(speed / 100 - 1));
    }

    requestAnimationFrame(onMouseMove);
  }, [pos]);

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
        animate={{
          x: `calc(${pos.x}px - 1vw)`,
          y: `calc(${pos.y}px - 1vw)`,
          
          
        }}
        transition={{ duration: 0.5, ease: "circOut", rotate: {
          duration: 0.1, ease: "linear"
        } }}
        style={{rotate: rot,}}
        className=" fixed top-0 left-0 size-[2vw] flex items-center justify-center mix-blend-difference pointer-events-none z-50"
      >
        <motion.div
          // initial={{ scale: 1 }}
          animate={{
            // transform: `scale(${enabled ? (expanded ? 2 : 1) : 0},${enabled ? (expanded ? 2 : scale) : 0})`,
            scaleX: enabled ? (expanded ? 2 : Math.abs(2-scale)) : 0,
            scaleY: enabled ? (expanded ? 2 : scale) : 0,

            
            
          }}
          transition={{
            duration: 0.5,
            ease: "circOut",
            transform: {
              duration: 0.5,
              ease: "circOut",
            },
          }}
          className=" pointer-events-none size-full rounded-[50%] border-2 border-white blur-[1px] mix-blend-difference  z-[100] flex items-center justify-center"
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cursor;
