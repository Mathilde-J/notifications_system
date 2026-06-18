import React from "react";
import { Link, type LinkProps } from "react-router";
import { motion } from "motion/react";
import style from "../style.module.css";
import clsx from "clsx";
import { ButtonType, type ButtonTypeValue } from "../../constant";
import { buttonVariants, commonWhileTap } from "../shared";

interface AppLinkButtonProps extends Omit<LinkProps, "title"> {
  title: string;
  buttonType: ButtonTypeValue;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const AppLinkButton: React.FC<AppLinkButtonProps> = ({
  title,
  buttonType,
  icon: Icon,
  ...rest
}) => {
  const isSecondary = buttonType === ButtonType.SECONDARY;
  const isAction = buttonType === ButtonType.ACTION;
  const isPrimary = buttonType === ButtonType.PRIMARY;

  const buttonStyle = isSecondary
    ? "button_secondary"
    : isAction
      ? "button_action"
      : "";

  return (
    <motion.div
      variants={buttonVariants}
      initial={"rest"}
      whileHover={"hover"}
      whileTap={{
        ...commonWhileTap,
        scale: isPrimary ? 1.03 : 1,
        boxShadow: isPrimary ? "none" : "var(--shadow_secondary)" ,
      }}
    >
      <Link
        {...rest}
        className={clsx(
          style.button_base,
          Icon && style.button__with_icon,
          style[buttonStyle],
        )}
      >
        <span className="text_regular">{title}</span>
        {Icon && (
          <span className={style.input_icon} aria-hidden="true">
            <Icon />
          </span>
        )}
      </Link>
    </motion.div>
  );
};
