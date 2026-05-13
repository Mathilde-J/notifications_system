import { Outlet } from "react-router";
import Button from "../components/button/Button";
import { ButtonType } from "../components/constant";

export default function MainLayout() {
  return (
    <div>
      {/* TODO supprimer div plus tard */}
      <div>La y a la header</div>
      <Button title={"test"} buttonType={ButtonType.PRIMARY} />
      <Button title={"test"} buttonType={ButtonType.ACTION} />
      <Button title={"test"} buttonType={ButtonType.SECONDARY} />
      <Outlet />
    </div>
  );
}
