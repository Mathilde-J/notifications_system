import { Outlet } from "react-router";
import Button from "../components/button/Button";
import { ButtonType } from "../components/constant";
import { InputComponent } from "../components/inputComponent/InputComponent";

export default function MainLayout() {
  return (
    <div>
      {/* TODO supprimer div plus tard */}
      <div>La y a la header</div>
      <Button title={"test"} buttonType={ButtonType.PRIMARY} />
      <Button title={"test"} buttonType={ButtonType.ACTION} />
      <Button title={"test"} buttonType={ButtonType.SECONDARY} />
      <InputComponent label={"Recherche"} variant="search" placeholder="Search..."/>
      <Outlet />
    </div>
  );
}
