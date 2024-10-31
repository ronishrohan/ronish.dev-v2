import { ReactNode } from "react";
import { motion } from "framer-motion";

const TextAppearWords = ({ children }: { children: ReactNode }) => {
    return (
      <div className="flex gap-[0.2em] flex-wrap select-none">
        {children
          ?.toString()
          .split(" ")
          .map((word, index) => {
            return (
              <div className="overflow-hidden flex">
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  transition={{
                    duration: 0.6,
                    delay: index * children.toString().split(" ").length/5000,
                    ease: "circOut",
                  }}
                >
                  {word}
                </motion.div>
              </div>
            );
          })}
      </div>
    );
  };

  export default TextAppearWords
  