import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import style from "./style.module.css";
import clsx from "clsx";
import { ButtonType, type ButtonTypeValue } from "../constant";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "title"> {
  title: string;
  buttonType: ButtonTypeValue;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  buttonType,
  onClick,
  type = "button",
  icon: Icon,
  ...rest
}) => {
  const isSecondary = buttonType === ButtonType.SECONDARY;
  const isAction = buttonType === ButtonType.ACTION;

  const buttonStyle = isSecondary
    ? "button_secondary"
    : isAction
      ? "button_action"
      : "";

  return (
    <motion.button
      {...rest}
      onClick={onClick}
      initial={{ scale: 1 }}
      whileHover={{ scale: !isAction ? 1.05 : 1 }}
      className={clsx(
        style.button_base,
        Icon && style.button__with_icon,
        style[buttonStyle],
      )}
      type={type}
    >
      <span className="text_regular">{title}</span>
      {Icon && (
        <span className={style.input_icon} aria-hidden="true">
          <Icon />
        </span>
      )}
    </motion.button>
  );
};
