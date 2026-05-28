import React from "react";
import { AppPageTitle } from "../../shared/components/appPageTitle/AppPageTitle";
import { ButtonType } from "../../shared/components/constant";
import style from "./style.module.css";
import { AppButton } from "../../shared/components/appButtons/appButton/AppButton";

export const NewMessagePage: React.FC = () => {
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
              className={style.new_message_textarea}
              placeholder="Votre message..."
              aria-label="Contenu du message"
            />
          </div>

          <div className={style.new_message_settings}>
            <h2 className="h2">Paramètres</h2>
            <div className={style.new_message_settings_list}>
              {/* TODO : accordéons Email, SMS, etc */}
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
