import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../shared/layout/MainLayout";
import MessagesPage from "../pages/MessagesPages.tsx/MessagesPage";
import { NewMessagePage } from "../pages/NewMessagePage/NewMessagePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/messages" replace />,
      },
      { path: "messages", element: <MessagesPage /> },
      { path: "messages/new", element: <NewMessagePage /> },
    ],
  },
]);
