import React, {
  FC,
  HTMLAttributes,
  useCallback,
  KeyboardEvent,
  useRef,
} from "react";
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
  const rootRef = useRef<HTMLDivElement | null>(null);

  const handleKeyboardClose = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    },
    [onClose]
  );

  const handleKeydown = (event: KeyboardEvent) => {
    if (!rootRef.current || event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      rootRef.current.getElementsByTagName("*")
    ).filter((el: HTMLElement) => el.tabIndex > -1) as HTMLElement[];

    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    if (event.shiftKey && event.target === focusableElements[0]) {
      event.preventDefault();
      lastFocusableElement.focus();
      return;
    }

    if (!event.shiftKey && event.target === lastFocusableElement) {
      event.preventDefault();
      focusableElements[0].focus();
    }
  };

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
      ref={rootRef}
      onKeyDown={handleKeydown}
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
