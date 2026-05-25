import { Icons } from "../icons";

const ButtonType = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACTION: "action",
} as const;

type ButtonTypeValue = (typeof ButtonType)[keyof typeof ButtonType];

const LabelType = {
  EMAIL: {
    icon: Icons.email,
    classname: "email",
    text: "Email",
  },
  FAIL: {
    classname: "fail",
    text: "Echec",
  },
  SUCCESS: {
    classname: "success",
    text: "Validé",
  },
} as const;

export { LabelType, ButtonType };
export type { ButtonTypeValue };
