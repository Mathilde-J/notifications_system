import React from "react";
import { AppPageTitle } from "../../shared/components/appPageTitle/AppPageTitle";
import { ButtonType } from "../../shared/components/constant";
import style from "./style.module.css";
import { AppButton } from "../../shared/components/appButtons/appButton/AppButton";
import type { MessageInput } from "../../features/messages/types/message";
import { AppAccordion } from "../../shared/components/appAccordion/AppAccordion";

export const NewMessagePage: React.FC = () => {
  const [message, setMessage] = React.useState<MessageInput>({
    content: "",
    messageType: "email",
    sender: "",
    receiver: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }));
  };

  return (
    <>
      <AppPageTitle title={"Nouveau message"} />
      <section
        className={style.new_message_page_section}
        aria-label="Envoi de message"
      >
        <form className={style.new_message_container}>
          <div className={style.new_message_content}>
            <h2 className="h2">Nouveau Message</h2>
            <textarea
              onChange={handleInputChange}
              name="content"
              value={message.content}
              className={style.new_message_textarea}
              placeholder="Votre message..."
              aria-label="Contenu du message"
            />
          </div>

          <div className={style.new_message_settings}>
            <h2 className="h2">Paramètres</h2>
            <div className={style.new_message_settings_list}>
              {/* TODO : accordéons Email, SMS, etc */}
              <AppAccordion children={<div>Hello</div>} title={"Email"} />
            </div>
            <div className={style.new_message_settings_footer}>
              <hr className={"title_separator"} />
              <AppButton
                className={style.new_message_settings_button}
                title="Envoyer"
                buttonType={ButtonType.ACTION}
                // icon={Icons.send}
                type="submit"
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
