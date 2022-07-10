import React, { FC } from "react";
import { IconProps } from "./icon-props";
import styles from "./icon.module.css";
import cx from "classnames";

export const Edit: FC<IconProps> = (props) => {
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
      <path d="M9 39H11.2L33.35 16.85L31.15 14.65L9 36.8ZM39.7 14.7 33.3 8.3 35.4 6.2Q36.25 5.35 37.5 5.35Q38.75 5.35 39.6 6.2L41.8 8.4Q42.65 9.25 42.65 10.5Q42.65 11.75 41.8 12.6ZM37.6 16.8 12.4 42H6V35.6L31.2 10.4ZM32.25 15.75 31.15 14.65 33.35 16.85Z" />
    </svg>
  );
};
