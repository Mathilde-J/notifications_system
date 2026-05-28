import { Outlet } from "react-router";
import style from "./style.module.css";
import { githubLink } from "../../constants";

export default function MainLayout() {
  return (
    <main className={style.main_layout}>
      <header className={style.main_layout_header}>
        <a href={githubLink} rel="noopener noreferrer">
          Accéder à Github
        </a>
      </header>
      <Outlet />
    </main>
  );
}
