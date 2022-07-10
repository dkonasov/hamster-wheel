import React, { FC } from "react";
import { Modal, ModalProps } from "../../ui-kit/modal/modal";

export interface <%= classify(name) %>DialogProps extends ModalProps {}

export const <%= classify(name) %>Dialog: FC<<%= classify(name) %>DialogProps> = (props) => {
    const { ...modalProps } = props;
    return (
        <Modal {...modalProps}>
            TODO: implement dialog
        </Modal>
    )
}