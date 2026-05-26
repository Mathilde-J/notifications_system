import React from "react";
import style from "./style.module.css";
import { Button } from "../../shared/components/button/Button";
import { ButtonType } from "../../shared/components/constant";
import { Icons } from "../../shared/icons";
import { Input } from "../../shared/components/input/Input";
import { PageTitle } from "../../shared/components/pageTitle/PageTitle";
import MessagesTable from "../../features/messages/components/MessagesTable/MessagesTable";
import { Accordion } from "../../shared/components/accordion/Accordion";

const MessagesPage: React.FC = () => {
  return (
    <>
      <PageTitle title={"messages"} />
      <section>
        <div className={style.messages_page_section}>
          <Input variant="search" label={"Rechercher des messages..."} />
          <div className={style.messages_page_filter}>
            <Button title={"Type"} buttonType={ButtonType.PRIMARY} />
            <Button title={"Date"} buttonType={ButtonType.PRIMARY} />
            <Button title={"Status"} buttonType={ButtonType.PRIMARY} />
          </div>
          <Button
            title={"Nouveau Message"}
            icon={Icons.plus}
            buttonType={ButtonType.ACTION}
          />
        </div>
        <MessagesTable />
        <Accordion
          children={
            <div>
              heldokeofkeokfoe
              <p>,kenfkne</p>
              <p>,kenfkne</p>
              <p>,kenfkne</p>
              <p>,kenfkne</p>
              <p>,kenfkne</p>
            </div>
          }
          title={"titre de l'acordéon"}
        />
      </section>
    </>
  );
};

export default MessagesPage;
