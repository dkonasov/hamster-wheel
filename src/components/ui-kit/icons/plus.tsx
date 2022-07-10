import React, { FC } from "react";
import { IconProps } from "./icon-props";
import styles from "./icon.module.css";
import cx from "classnames";

export const Plus: FC<IconProps> = (props) => {
    const { size = 48, className, ...restProps } = props;
    return (
  <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 0 48 48" className={cx(className, styles.root)} {...restProps}>
    <path d="M22.5 38V25.5H10V22.5H22.5V10H25.5V22.5H38V25.5H25.5V38Z" />
  </svg>
)};
