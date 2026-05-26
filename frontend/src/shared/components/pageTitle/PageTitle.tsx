import React from "react";
import style from "./style.module.css";
import clsx from "clsx";

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div>
      <h1 className={clsx("h1", style.page_title_h1)}>{title.toUpperCase()}</h1>
      <hr className={style.title_separator} role="separator" />
    </div>
  );
};
