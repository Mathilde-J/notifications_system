import React from "react";
import style from "./style.module.css";
import { AppPageTitle } from "../../shared/components/appPageTitle/AppPageTitle";
import { MessagesTable } from "../../features/messages/components/MessagesTable/MessagesTable";
import { Icons } from "../../shared/icons";
import { AppLinkButton } from "../../shared/components/appButtons/appLinkButton/AppLinkButton";

const MessagesPage: React.FC = () => {
  return (
    <>
      <AppPageTitle title={"messages"} />
      <div className={style.messages_page_options}>
        <AppLinkButton
          title={"Nouveau message"}
          buttonType={"action"}
          icon={Icons.plus}
          to={"new"}
        />
      </div>
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
