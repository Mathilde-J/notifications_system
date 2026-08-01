import { Outlet } from "react-router";
import style from "./style.module.css";

import { AppLinkButton } from "../components/appButtons/appLinkButton/AppLinkButton";
import { githubLink } from "../constants";

export default function MainLayout() {
  return (
    <main className={style.main_layout}>
      <header className={style.main_layout_header}>
        <AppLinkButton
          title={"Accéder à Github"}
          buttonType={"primary"}
          to={githubLink}
        />
      </header>
      <Outlet />
    </main>
  );
}
