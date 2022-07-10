import React from "react";
import { Meta, Story } from "@storybook/react";

import { Plus } from "../components/ui-kit/icons/plus";
import { Close } from "../components/ui-kit/icons/close";
import { Delete } from "../components/ui-kit/icons/delete";
import { Edit } from "../components/ui-kit/icons/edit";
import { Check } from "../components/ui-kit/icons/check";
import { Undo } from "../components/ui-kit/icons/undo";
import { More } from "../components/ui-kit/icons/more";

export default {
  title: "Example/Icons",
} as Meta;

export const PlusStory: Story = () => <Plus />;
PlusStory.storyName = "Plus";

export const CloseStory: Story = () => <Close />;
CloseStory.storyName = "Close";

export const DeleteStory: Story = () => <Delete />;
DeleteStory.storyName = "Delete";

export const EditStory: Story = () => <Edit />;
EditStory.storyName = "Edit";

export const CheckStory: Story = () => <Check />;
CheckStory.storyName = "Check";

export const UndoStory: Story = () => <Undo />;
UndoStory.storyName = "Undo";

export const MoreStory: Story = () => <More />;
MoreStory.storyName = "More";
