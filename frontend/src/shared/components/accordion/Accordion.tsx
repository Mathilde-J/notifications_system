import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import style from "./style.module.css";
import { Icons } from "../../icons";

interface AccordionProps {
  children: React.ReactNode;
  title: string;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const Icon = Icons.arrow;
  const [isAccordionOpen, setIsAccordion] = useState(false);
  return (
    <motion.div className={style.accordion_wrapper}>
      <div className={style.accordion_header}>
        <h3>{title}</h3>
        <motion.button
          aria-controls="accordion_content_id"
          aria-expanded={isAccordionOpen}
          initial={{ rotate: 0 }}
          animate={{ rotate: isAccordionOpen ? 180 : 0 }}
          onClick={() => setIsAccordion(!isAccordionOpen)}
          className={style.accordion_button}
        >
          <Icon />
        </motion.button>
      </div>
      <AnimatePresence initial={false}>
        {isAccordionOpen && (
          <motion.div
            id="accordion_content_id"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className={style.accordion_content}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
