import React, { ComponentType, forwardRef, HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { IconProps } from "../icons/icon-props";
import styles from "./menu.module.css";

export interface MenuItem {
  text: string;
  icon: ComponentType<IconProps>;
  onClick?: () => void;
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  items: MenuItem[];
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const { visible, items, ...restProps } = props;
  return createPortal(
    <>
      {visible && (
        <div ref={ref} {...restProps} className={styles.root}>
          {items.map((item) => (
            <div
              key={item.text}
              className={styles.element}
              onClick={item.onClick}
            >
              <item.icon size={24} />
              {item.text}
            </div>
          ))}
        </div>
      )}
    </>,
    document.body
  );
});
