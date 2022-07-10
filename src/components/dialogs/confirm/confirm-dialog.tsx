import React, { FC } from "react";
import { useCallback } from "react";
import { Button } from "../../ui-kit/button/button";
import { Modal, ModalProps } from "../../ui-kit/modal/modal";
import styles from "./confirm-dialog.module.css";

export interface ConfirmDialogProps extends ModalProps {
  text: string;
  okText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const {
    text,
    okText = "OK",
    cancelText = "Cancel",
    onConfirm,
    ...modalProps
  } = props;
  const handleConfirm = useCallback(() => {
    onConfirm?.();
    modalProps.onClose?.();
  }, [onConfirm, modalProps.onClose]);

  return (
    <Modal {...modalProps}>
      <div className={styles.content}>
        <div className={styles.text}>{text}</div>
        <Button className={styles.ok} onClick={handleConfirm}>
          {okText}
        </Button>
        <Button
          className={styles.cancel}
          variant="secondary"
          onClick={modalProps.onClose}
        >
          {cancelText}
        </Button>
      </div>
    </Modal>
  );
};
