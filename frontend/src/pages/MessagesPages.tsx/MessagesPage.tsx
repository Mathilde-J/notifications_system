import React from "react";
import style from "./style.module.css";
import { AppPageTitle } from "../../shared/components/appPageTitle/AppPageTitle";
import MessagesTable from "../../features/messages/components/MessagesTable/MessagesTable";

const MessagesPage: React.FC = () => {
  return (
    <>
      <AppPageTitle title={"messages"} />
      <section
        className={style.messages_page_section}
        aria-label="Liste des messages"
      >
        <MessagesTable />
      </section>
    </>
  );
};

export default MessagesPage;
