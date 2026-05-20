import React from "react";
import style from "./style.module.css";

const ButtonType = {
  primary: "primary",
  secondary: "secondary",
  action: "action",
};

interface ButtonProps {
  title: string;
  buttonType: (typeof ButtonType)[keyof typeof ButtonType];
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  buttonType,
  onClick,
  type = "button",
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
      className={`${style.button_base} ${buttonStyle}`}
      type={type}
    >
      <span className="text_regular">{title}</span>
    </button>
  );
};

export default CustomButton;
