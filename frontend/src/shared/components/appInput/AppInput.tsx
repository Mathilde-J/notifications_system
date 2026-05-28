import { useId, type InputHTMLAttributes } from "react";
import style from "./style.module.css";
import clsx from "clsx";
import { Icons } from "../../icons";

type InputVariant = "default" | "search";

export interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: InputVariant;
  errorMessage?: string;
}

export const AppInput = ({
  id,
  label,
  variant = "default",
  errorMessage,
  disabled = false,
  required = false,
  className,
  ...rest
}: AppInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}_error`;
  const hasError = Boolean(errorMessage);
  const isSearchVariant = variant === "search";
  const Icon = isSearchVariant ? Icons.search : null;

  return (
    <div className={style.input_wrapper}>
      <label htmlFor={inputId} className="sr_only">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <div
        className={clsx(
          style.input_container,
          Icon && style.input_container__with_icon,
          hasError && style.input_container__error,
          disabled && style.input_container__disabled,
        )}
      >
        {Icon && (
          <span className={style.input_icon} aria-hidden="true">
            <Icon />
          </span>
        )}

        <input
          {...rest}
          id={inputId}
          type={isSearchVariant ? "search" : (rest.type ?? "text")}
          disabled={disabled}
          required={required}
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError ? "true" : undefined}
          className={clsx(style.input_field, className, "text_small_light")}
          role={isSearchVariant ? "search" : "textbox"}
        ></input>
      </div>

      {hasError && (
        <p id={errorId} className={style.input_error} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
