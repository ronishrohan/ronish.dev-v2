import { ReactNode } from "react";
import { motion } from "framer-motion";

const TextAppearUp = ({
    children,
    delay,
  }: {
    children: ReactNode | null;
    delay: number;
  }) => {
    children = children ?? "";
    return (
      <div className="flex">
        {children
          .toString()
          .split("")
          .map((char, index) => {
            return (
              <div className="size-fit overflow-hidden z-10">
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

export default TextAppearUp;