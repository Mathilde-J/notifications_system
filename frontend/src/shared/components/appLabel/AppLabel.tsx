import React from "react";
import { LabelType, type LabelTypeKey } from "../constant";
import clsx from "clsx";
import style from "./style.module.css";

interface AppLabelProps {
  type: LabelTypeKey;
}

export const AppLabel: React.FC<AppLabelProps> = ({ type }) => {
  const labelType = LabelType[type];
  if (!labelType) return null;
  const Icon = "icon" in labelType ? labelType.icon : null;

  return (
    <div
      className={clsx(
        "text_xsmall_bold",
        style.label_base,
        style[labelType.key],
        Icon && style.label__with_icon,
      )}
    >
      {Icon && <Icon className={style.label_icon} />}
      {labelType.text}
    </div>
  );
};
