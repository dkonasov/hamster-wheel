import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../components/ui-kit/button/button';
import { Plus } from '../components/ui-kit/icons/plus';
import "../theme.css";

export default {
  title: 'Example/Button',
  component: Button
} as ComponentMeta<typeof Button>;

export const Icon: ComponentStory<typeof Button> = (args) => <Button {...args}><Plus /></Button>;

Icon.args = {
  variant: 'round',
}

Icon.argTypes = {
  variant: {
    options: ["round", "clear"],
    control: { type: "radio" },
  },
};

export const Regular: ComponentStory<typeof Button> = (args) => <Button {...args}>Click me!</Button>;

Regular.args = {
  variant: 'primary',
}

Regular.argTypes = {
  variant: {
    options: ["primary", "secondary"],
    control: { type: "radio" },
  },
};
