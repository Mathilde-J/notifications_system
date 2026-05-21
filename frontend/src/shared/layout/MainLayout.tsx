import { Outlet } from "react-router";
import Button from "../components/button/Button";
import { ButtonType, LabelType } from "../components/constant";
import { InputComponent } from "../components/inputComponent/InputComponent";
import { Icons } from "../icons";
import LabelComponent from "../components/label/LabelComponent";

export default function MainLayout() {
  return (
    <div>
      {/* TODO supprimer div plus tard */}
      <div>La y a la header</div>
      <Button title={"test"} buttonType={ButtonType.PRIMARY} />
      <Button title={"test"} buttonType={ButtonType.ACTION} icon={Icons.plus} />
      <Button title={"test"} buttonType={ButtonType.SECONDARY} />
      <InputComponent
        label={"Recherche"}
        variant="search"
        placeholder="Search..."
      />
      <LabelComponent type={LabelType.EMAIL} />
      <LabelComponent type={LabelType.FAIL} />
      <LabelComponent type={LabelType.SUCCESS} />
      <Outlet />
    </div>
  );
}
