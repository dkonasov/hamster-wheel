import React, { ButtonHTMLAttributes, forwardRef, HTMLAttributes } from "react";
import { FC } from "react";
import cx from "classnames";
import styles from "./button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "round" | "clear" | "primary" | "secondary";
  type?: "submit" | "button";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, variant = "primary", ...restProps } = props;
    return (
      <button
        className={cx(className, styles.root, styles[`variant-${variant}`])}
        {...restProps}
        ref={ref}
      >
        {props.children}
      </button>
    );
  }
);
