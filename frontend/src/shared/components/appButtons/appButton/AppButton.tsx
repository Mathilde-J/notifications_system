import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import style from "../style.module.css";
import clsx from "clsx";
import { ButtonType, type ButtonTypeValue } from "../../constant";
import { buttonVariants, commonWhileTap, iconVariants } from "../shared";

interface AppButtonProps extends Omit<HTMLMotionProps<"button">, "title"> {
  title: string;
  buttonType: ButtonTypeValue;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  buttonType,
  onClick,
  type = "button",
  icon: Icon,
  ...rest
}) => {
  const isSecondary = buttonType === ButtonType.SECONDARY;
  const isAction = buttonType === ButtonType.ACTION;
  const isPrimary = buttonType === ButtonType.PRIMARY;

  const buttonStyle = isSecondary
    ? "button_secondary"
    : isAction
      ? "button_action"
      : "";

  return (
    <motion.button
      {...rest}
      onClick={onClick}
      variants={buttonVariants}
      initial={"rest"}
      whileHover={"hover"}
      whileTap={{
        ...commonWhileTap,
        scale: isPrimary ? 1.03 : 1,
        boxShadow: isPrimary ? "none" : "var(--shadow_secondary)",
      }}
      className={clsx(
        style.button_base,
        Icon && style.button__with_icon,
        style[buttonStyle],
        rest.disabled && style.button__disbaled,
        rest.className,
      )}
      type={type}
    >
      <motion.span className="text_regular">{title}</motion.span>
      {Icon && (
        <motion.span
          variants={iconVariants}
          className={style.input_icon}
          aria-hidden="true"
        >
          <Icon />
        </motion.span>
      )}
    </motion.button>
  );
};
