import React from "react";
import style from "./style.module.css";
import { AppPageTitle } from "../../shared/components/appPageTitle/AppPageTitle";
import MessagesTable from "../../features/messages/components/MessagesTable/MessagesTable";
import { useMessages } from "../../features/messages/hooks/useMessages/useMessages";

const MessagesPage: React.FC = () => {
  const { data, error, isLoading } = useMessages();

  return (
    <>
      <AppPageTitle title={"messages"} />
      <section aria-label="Liste des messages">
        {/* TODO : recherche et filtres */}
        <div className={style.messages_page_section}></div>
        {isLoading && <p>Chargement...</p>}
        {error && <p>Error</p>}
        {data && <MessagesTable data={data} />}
      </section>
    </>
  );
};

export default MessagesPage;
