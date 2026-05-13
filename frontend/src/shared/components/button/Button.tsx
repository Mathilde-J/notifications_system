import React from "react";
import style from "./style.module.css";

interface ButtonProps {
  title: string;
  buttonType: string;
}

const CustomButton: React.FC<ButtonProps> = ({ title, buttonType }) => {
  console.log("🚀 ~ CustomButton ~ buttonType:", buttonType);

  return (
    <button className={style.buttonBase} type="button">
      <span className="text_regular">{title}</span>
    </button>
  );
};

export default CustomButton;
