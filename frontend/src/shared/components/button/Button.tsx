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
}

const CustomButton: React.FC<ButtonProps> = ({ title, buttonType }) => {
  const buttonStyle =
    buttonType == ButtonType.secondary
      ? "button_secondary"
      : buttonType == ButtonType.action
        ? "button_action"
        : "";

  return (
    <button className={`${style.button_base} ${buttonStyle}`} type="button">
      <span className="text_regular">{title}</span>
    </button>
  );
};

export default CustomButton;
