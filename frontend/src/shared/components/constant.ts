import { Icons } from "../icons";

const ButtonType = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACTION: "action",
} as const;

type ButtonTypeValue = (typeof ButtonType)[keyof typeof ButtonType];

const LabelType = {
  email: {
    icon: Icons.email,
    key: "email",
    text: "Email",
  },
  sms: {
    key: "sms",
    text: "Sms",
  },
  fail: {
    key: "fail",
    text: "Echoué",
  },
  success: {
    key: "success",
    text: "Réussi",
  },
  notification: { key: "notification", text: "Push" },
  slack: { key: "slack", text: "Slack" },
} as const;

export type LabelTypeKey = keyof typeof LabelType;

export { LabelType, ButtonType };
export type { ButtonTypeValue };
