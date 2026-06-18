import React, { useId, useState } from "react";
import { AppPageTitle } from "../../shared/components/appPageTitle/AppPageTitle";
import { ButtonType } from "../../shared/components/constant";
import style from "./style.module.css";
import { AppButton } from "../../shared/components/appButtons/appButton/AppButton";
import type { MessageInput } from "../../features/messages/types/message";
import { AppAccordion } from "../../shared/components/appAccordion/AppAccordion";
import { AppInput } from "../../shared/components/appInput/AppInput";
import { isEmail, isNotEmpty } from "../../shared/utils/functions";
import { Icons } from "../../shared/icons";
// import { useSendMessage } from "../../features/messages/hooks/useSendMessage/useSendMessage";

export const NewMessagePage: React.FC = () => {
  // const { isPending, mutate } = useSendMessage();
  const isPending = false;

  const [message, setMessage] = useState<MessageInput>({
    content: "",
    messageType: "email",
    sender: "",
    receiver: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputProperties = [
    {
      id: useId(),
      name: "sender",
      label: "de*",
      placeholder: "Email de l'expéditeur...",
      required: true,
      validators: [isNotEmpty, isEmail],
    },
    {
      id: useId(),
      name: "receiver",
      label: "à*",
      placeholder: "Email du destinataire...",
      required: true,
      validators: [isNotEmpty, isEmail],
    },
    {
      id: useId(),
      name: "title",
      label: "objet",
      placeholder: "Sujet de l'email...",
    },
  ];

  const updateMessage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }));
    setErrors((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const checkSenderInputValues = () => {
    const newErrors: Record<string, string> = {};

    inputProperties.forEach((inputProps) => {
      if (!inputProps.validators) return;
      const value = message[inputProps.name as keyof MessageInput] ?? "";

      for (const validator of inputProps.validators) {
        const error = validator(value);
        if (error) {
          newErrors[inputProps.name] = error;
          break;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (checkSenderInputValues()) {
      // mutate(message);
    }
  };

  return (
    <>
      <AppPageTitle title={"Nouveau message"} />
      <section
        className={style.new_message_page_section}
        aria-label="Envoi de message"
      >
        <form className={style.new_message_container} onSubmit={sendMessage}>
          <div className={style.new_message_content}>
            <h2 className="h2">Nouveau Message</h2>
            <textarea
              disabled={isPending}
              onChange={updateMessage}
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
              <AppAccordion
                children={
                  <>
                    {inputProperties.map((inputProps) => {
                      return (
                        <div
                          key={inputProps.id}
                          className={style.setting_accordion_input}
                        >
                          <span className={style.input_label}>
                            {inputProps.label}:
                          </span>
                          <AppInput
                            errorMessage={errors[inputProps.name]}
                            name={inputProps.name}
                            required={inputProps.required}
                            placeholder={inputProps.placeholder}
                            onChange={updateMessage}
                            label={inputProps.label}
                          />
                        </div>
                      );
                    })}
                  </>
                }
                title={"Email"}
              />
            </div>
            <div className={style.new_message_settings_footer}>
              <hr className={"title_separator"} />
              <AppButton
                // disabled={isPending}
                className={style.new_message_settings_button}
                title={isPending ? "Envoie en cours..." : "Envoyer"}
                buttonType={ButtonType.ACTION}
                icon={Icons.paperPlane}
                type="submit"
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
