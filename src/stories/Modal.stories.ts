import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { useModal } from "../Modal/useModal";

const meta = {
  title: "Modal",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
  render: (args) => {
    const modal = useModal();
    const openModal = async () => {
      const res = await modal.push("modal1", Modal, { name: "test" });
      console.log(res);
    };

    return <h2>test</h2>;
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
