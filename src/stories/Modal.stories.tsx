import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { IDefaultModalProps, ModalProvider, useModal } from "../Modal";

const meta = {
  title: "Modal",
  component: Button,
  decorators: [
    (Story) => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
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

interface ITestModalProps extends IDefaultModalProps {
  title: string;
}

const TestModal = ({ title, resolve, reject }: ITestModalProps) => {
  return (
    <div
      style={{
        width: "400px",
        height: "200px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "20px",
        border: "1px solid gray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {title}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <button onClick={() => reject("close")}>close</button>
        <button onClick={() => resolve("open")}>open</button>
      </div>
    </div>
  );
};

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
  render: (args) => {
    const modal = useModal();
    const openModal = async () => {
      const res = await modal.push({
        key: "modal1",
        Component: TestModal,
        props: { title: "test modal" },
      });
      alert(res);
    };

    return <Button {...args} onClick={openModal} />;
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
