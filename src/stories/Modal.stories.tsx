import React, { useCallback, useState } from "react";
import { Meta, Story } from "@storybook/react";

import styles from "./Modal.stories.module.css";
import { Modal } from "../components/ui-kit/modal/modal";
import "../global.css";

export default {
  title: "Example/Modal",
} as Meta;

const Template: Story = () => {
  const [ visible, setVisible ] = useState(false);
  const showModal = useCallback(() => setVisible(true), [setVisible]);
  const hideModal = useCallback(() => setVisible(false), [setVisible]);

  return (
    <div className={styles.root}>
      <button onClick={showModal}>Open modal</button>
      <Modal visible={visible} title="Modal title" onClose={hideModal}>I am modal!</Modal>
    </div>
  );
};

export const Default = Template.bind({});
