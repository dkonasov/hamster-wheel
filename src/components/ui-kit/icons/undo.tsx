import React, { FC } from "react";
import { IconProps } from "./icon-props";
import styles from "./icon.module.css";
import cx from "classnames";

export const Undo: FC<IconProps> = (props) => {
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
      <path d="M28.4 38H14V35H28.45Q31.95 35 34.475 32.675Q37 30.35 37 26.9Q37 23.45 34.475 21.125Q31.95 18.8 28.45 18.8H13.7L19.4 24.5L17.3 26.6L8 17.3L17.3 8L19.4 10.1L13.7 15.8H28.4Q33.15 15.8 36.575 19Q40 22.2 40 26.9Q40 31.6 36.575 34.8Q33.15 38 28.4 38Z" />
    </svg>
  );
};
