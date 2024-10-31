import { ReactNode } from "react";
import { motion } from "framer-motion";

const TextAppearWords = ({ children }: { children: ReactNode }) => {
    return (
      <motion.div exit={{opacity: 0}} className="flex gap-[0.2em] flex-wrap select-none">
        {children
          ?.toString()
          .split(" ")
          .map((word, index) => {
            return (
              <div className="overflow-hidden flex">
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  exit={{y: "100%"}}
                  transition={{
                    duration: 0.4,
                    delay: index * children.toString().split(" ").length/5000,
                    ease: "circOut",
                  }}
                >
                  {word}
                </motion.div>
              </div>
            );
          })}
      </motion.div>
    );
  };

  export default TextAppearWords
  