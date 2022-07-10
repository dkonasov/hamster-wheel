import React, { useCallback, useState } from "react";
import { Meta, Story } from "@storybook/react";

import styles from "./Modal.stories.module.css";
import "../global.css";
import { Menu, MenuItem } from "../components/ui-kit/menu/menu.component";
import { useMenu } from "../hooks/use-menu";
import { Check } from "../components/ui-kit/icons/check";
import { Undo } from "../components/ui-kit/icons/undo";

export default {
  title: "Example/Menu",
} as Meta;

const Template: Story = () => {
  const [visible, setVisible] = useState(false);
  const hideMenu = useCallback(() => setVisible(false), [setVisible]);
  const { triggerProps, menuProps } = useMenu({
    onOpenChange: setVisible,
    open: visible,
  });
  const items: MenuItem[] = [
    {
      text: "Test1",
      icon: Check,
      onClick: hideMenu,
    },
    {
      text: "Test2",
      icon: Undo,
      onClick: hideMenu,
    },
  ];

  return (
    <div className={styles.root}>
      <button {...triggerProps}>Open menu</button>
      <Menu items={items} visible={visible} {...menuProps} />
    </div>
  );
};

export const Default = Template.bind({});
