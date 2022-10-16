import React, { FC, HTMLAttributes, useCallback, KeyboardEvent } from "react";
import styles from "./modal.module.css";
import cx from "classnames";
import { Button } from "../button/button";
import { Close } from "../icons/close";
import { createPortal } from "react-dom";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  title: string;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
  const { visible, children, className, title, onClose, ...restProps } = props;
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleKeyboardClose = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    },
    [onClose]
  );

  if (!visible) {
    return null;
  }

  return createPortal(
    <div
      {...restProps}
      role="dialog"
      aria-modal={true}
      aria-label={title}
      className={cx(className, styles.root)}
      onKeyUp={handleKeyboardClose}
    >
      <div className={styles.titleRow}>
        <h2 className={styles.title}>{title}</h2>
        <Button variant="clear" autoFocus>
          <Close size={36} onClick={handleClose} />
        </Button>
      </div>
      {children}
    </div>,
    document.body
  );
};
