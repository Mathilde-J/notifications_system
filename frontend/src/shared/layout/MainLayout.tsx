import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      {/* TODO supprimer div plus tard */}
      <div>La y a la header</div>
      <Outlet />
    </div>
  );
}
