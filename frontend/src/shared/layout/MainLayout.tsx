import { Outlet } from "react-router";
import style from "./style.module.css";
import { ButtonType } from "../components/constant";
import { AppButton } from "../components/appButton/AppButton";

export default function MainLayout() {
  return (
    <main className={style.main_layout}>
      <header className={style.main_layout_header}>
        <AppButton
          title={"Accéder au github"}
          buttonType={ButtonType.SECONDARY}
        />
      </header>

      <Outlet />
    </main>
  );
}
