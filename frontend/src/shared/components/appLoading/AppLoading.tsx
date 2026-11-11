import React from "react";
import style from "./style.module.css";

import clsx from "clsx";

export const AppLoading: React.FC = () => {

  return (
    <div className={clsx(style.loading_container, "text_regular")}>
      <div>loading à améliorer</div>
    </div>
  );
};
