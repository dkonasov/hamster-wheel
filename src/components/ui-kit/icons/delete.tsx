import React, { FC } from "react";
import { IconProps } from "./icon-props";
import styles from "./icon.module.css";
import cx from "classnames";

export const Delete: FC<IconProps> = (props) => {
  const { size = 48, className, ...restProps } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 0 48 48" className={cx(className, styles.root)} {...restProps}>
      <path d="M13.05 42Q11.85 42 10.95 41.1Q10.05 40.2 10.05 39V10.5H8V7.5H17.4V6H30.6V7.5H40V10.5H37.95V39Q37.95 40.2 37.05 41.1Q36.15 42 34.95 42ZM34.95 10.5H13.05V39Q13.05 39 13.05 39Q13.05 39 13.05 39H34.95Q34.95 39 34.95 39Q34.95 39 34.95 39ZM18.35 34.7H21.35V14.75H18.35ZM26.65 34.7H29.65V14.75H26.65ZM13.05 10.5V39Q13.05 39 13.05 39Q13.05 39 13.05 39Q13.05 39 13.05 39Q13.05 39 13.05 39Z" />
    </svg>
  );
};
