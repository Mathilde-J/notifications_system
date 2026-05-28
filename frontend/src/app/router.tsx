import { createBrowserRouter } from "react-router";
import MainLayout from "../shared/layout/MainLayout";
import MessagesPage from "../pages/MessagesPages.tsx/MessagesPage";
import NewMessagePage from "../pages/NewMessagePage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <MessagesPage /> },
      { path: "/messages/new", element: <NewMessagePage /> },
    ]
  }
])