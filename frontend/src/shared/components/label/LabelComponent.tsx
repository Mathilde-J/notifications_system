import React from "react";
import type { LabelType } from "../constant";
import clsx from "clsx";
import style from "./style.module.css";
export type LabelTypeValue = (typeof LabelType)[keyof typeof LabelType];

interface ComponentProps {
  type: LabelTypeValue;
}

const LabelComponent: React.FC<ComponentProps> = ({ type }) => {
  const Icon = "icon" in type ? type.icon : null;

  return (
    <div
      className={clsx(
        "text_xsmall_bold",
        style.label_base,
        style[type.classname],
        Icon && style.label__with_icon,
      )}
    >
      {Icon && <Icon className={style.label_icon} />}
      {type.text}
    </div>
  );
};

export default LabelComponent;
