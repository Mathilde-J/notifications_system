import type { TargetAndTransition } from "framer-motion";

export const commonWhileTap: TargetAndTransition = {
  transition: {
    duration: 0.1,
    ease: [0, 0.2, 0.2, 0.1],
  },
  y: 4,
};

export const buttonVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: 1, transition: { duration: 0.1 } },
};

export const iconVariants = {
  rest: { rotate: 0 },
  hover: { rotate: 20 },
};
