import React, { FC } from "react";
import { IconProps } from "./icon-props";
import styles from "./icon.module.css";
import cx from "classnames";

export const Check: FC<IconProps> = (props) => {
  const { size = 48, className, ...restProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 48 48"
      className={cx(className, styles.root)}
      {...restProps}
    >
      <path d="M18.9 35.7 7.7 24.5 9.85 22.35 18.9 31.4 38.1 12.2 40.25 14.35Z" />
    </svg>
  );
};
