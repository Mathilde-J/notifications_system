import { Outlet } from "react-router";
import style from "./style.module.css";
import { githubLink } from "../../constants";
import { AppLinkButton } from "../components/appButtons/appLinkButton/AppLinkButton";

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
