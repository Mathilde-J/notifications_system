import React from "react";
import style from "./style.module.css";
import clsx from "clsx";
import { ButtonType, type ButtonTypeValue } from "../constant";

interface ButtonProps {
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
}) => {
  const buttonStyle =
    buttonType === ButtonType.SECONDARY
      ? "button_secondary"
      : buttonType === ButtonType.ACTION
        ? "button_action"
        : "";

  return (
    <button
      onClick={onClick}
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
    </button>
  );
};

