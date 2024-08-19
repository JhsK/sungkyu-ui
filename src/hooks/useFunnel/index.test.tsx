import { screen } from "@testing-library/react";
import { useRender } from "test-util";

import { useFunnel } from ".";

function TestComponent() {
  const [Funnel, step, setStep] = useFunnel<"test1" | "test2">("test1");

  return (
    <Funnel>
      <Funnel.Step name="test1">
        <h1>test1</h1>
        <button onClick={() => setStep("test2")}>next</button>
      </Funnel.Step>
      <Funnel.Step name="test2">
        <h1>test2</h1>
      </Funnel.Step>
    </Funnel>
  );
}

it("컴포넌트 렌더링 시 test1 스텝 컴포넌트가 렌더링 된다", async () => {
  await useRender({
    component: <TestComponent />,
  });

  const renderTitle = await screen.findByText("test1");
  expect(renderTitle).toBeInTheDocument();
});

it("test1에서 setStep을 클릭하여 test2 스텝으로 넘어간다", async () => {
  const { user } = await useRender({
    component: <TestComponent />,
  });

  const nextButton = await screen.findByRole("button");
  await user.click(nextButton);

  const renderTitle = await screen.findByText("test2");
  expect(renderTitle).toBeInTheDocument();
});
