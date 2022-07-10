import React, { FC } from "react";
import { IconProps } from "./icon-props";
import styles from "./icon.module.css";
import cx from "classnames";

export const More: FC<IconProps> = (props) => {
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
      <path d="M10.4 26.4q-1 0-1.7-.7T8 24q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm13.6 0q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm13.6 0q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7T40 24q0 1-.7 1.7t-1.7.7Z" />
    </svg>
  );
};
