import { Outlet } from "react-router";
import style from "./style.module.css";
import { Button } from "../components/button/Button";
import { ButtonType } from "../components/constant";

export default function MainLayout() {
  return (
    <main className={style.main_layout}>
      <header className={style.main_layout_header}>
        <Button
          title={"Accéder au github"}
          buttonType={ButtonType.SECONDARY}
        />
      </header>

      <Outlet />
    </main>
  );
}
