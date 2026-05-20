import { useId, type InputHTMLAttributes } from "react";
import styles from "./style.module.css";
import clsx from "clsx";
import { Icons } from "../../icons";

type InputComponentVariant = "default" | "search";

export interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: InputComponentVariant;
  errorMessage?: string;
}

export function InputComponent({
  id,
  label,
  variant = "default",
  errorMessage,
  disabled = false,
  required = false,
  className,
  ...rest
}: InputComponentProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}_error`;
  const hasError = Boolean(errorMessage);
  const Icon = variant === "search" ? Icons.search : null

  return (
    <div className={styles.input_wrapper}>

      <label htmlFor={inputId} className="sr_only">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <div
        className={clsx(
          styles.input_container,
          Icon && styles.input_container__with_icon,
          hasError && styles.input_container__error,
          disabled && styles.input_container__disabled,
        )}
      >
        {Icon && (
          <span className={styles.input_icon} aria-hidden="true">
            <Icon />
          </span>
        )}

        <input
          id={inputId}
          type={variant === "search" ? "search" : rest.type ?? "text"}
          disabled={disabled}
          required={required}
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError ? "true" : undefined}
          className={clsx(styles.input_field, className, "text_small_light")}
          {...rest}
        >
          </input>
      </div>

      {hasError && (
        <p id={errorId} className={styles.input_error} role="alert">
          {errorMessage}
        </p>
      )}

    </div>
  );
}