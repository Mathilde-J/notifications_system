import React from "react";
import style from "./style.module.css";
import { motion } from "motion/react";
import clsx from "clsx";

export const AppLoading: React.FC = () => {
  const loadingText = "Chargement...";
  return (
    <div className={clsx(style.loading_container, "text_regular")}>
      {loadingText.split("").map((letter, index) => (
        <span key={index} className={style.loading_letter_container}>
          <motion.span
            className={style.loading_letter}
            initial={{ y: "0%" }}
            animate={{ y: "20%" }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
