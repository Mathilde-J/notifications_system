import React from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import style from "../style.module.css";
import clsx from "clsx";
import { ButtonType, type ButtonTypeValue } from "../../constant";
import { buttonVariants, commonWhileTap, iconVariants } from "../shared";

interface AppAnimatedButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "title"
> {
  title: string;
  buttonType: ButtonTypeValue;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  loadingTitle?: string;
  loadingSuccess?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
}

export const AppAnimatedButton: React.FC<AppAnimatedButtonProps> = ({
  title,
  buttonType,
  onClick,
  type = "button",
  icon: Icon,
  isLoading = false,
  loadingTitle,
  isSuccess = false,
  loadingSuccess,
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
    <motion.button
      {...rest}
      onClick={onClick}
      variants={buttonVariants}
      initial={"rest"}
      whileHover={"hover"}
      whileTap={{
        ...commonWhileTap,
        scale: isPrimary ? 1.03 : 1,
        boxShadow: isPrimary ? "none" : "var(--shadow_secondary)",
      }}
      className={clsx(
        style.button_base,
        Icon && style.button__with_icon,
        style[buttonStyle],
        rest.disabled && style.button__disbaled,
        rest.className,
      )}
      type={type}
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          // quand il arrive il apparait depuis la gauche et fade quand il part
          <motion.span key="loading" className="text_regular">
            {loadingTitle}
          </motion.span>
        )}

        {isSuccess && (
          // quand il arrive il apparait depuis la gauche et fade quand il part
          <motion.span key="success" className="text_regular">
            {loadingSuccess}
          </motion.span>
        )}

        {!isLoading && !isSuccess && (
          // quand il part il disparait simplement
          <motion.span exit={{}} key="default" className="text_regular">
            {title}
          </motion.span>
        )}
      </AnimatePresence>

      {Icon && (
        <motion.span
          variants={iconVariants}
          className={style.input_icon}
          aria-hidden="true"
        >
          <Icon />
        </motion.span>
      )}
    </motion.button>
  );
};
