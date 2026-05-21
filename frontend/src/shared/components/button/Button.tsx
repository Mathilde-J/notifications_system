import React from "react";
import style from "./style.module.css";
import clsx from "clsx";

const ButtonType = {
  primary: "primary",
  secondary: "secondary",
  action: "action",
} as const;

interface ButtonProps {
  title: string;
  buttonType: (typeof ButtonType)[keyof typeof ButtonType];
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  buttonType,
  onClick,
  type = "button",
  icon: Icon,
}) => {
  const buttonStyle =
    buttonType == ButtonType.secondary
      ? "button_secondary"
      : buttonType == ButtonType.action
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

export default CustomButton;
