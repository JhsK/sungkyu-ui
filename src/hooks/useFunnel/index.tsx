import { FC, isValidElement, ReactNode, useState } from "react";

interface IStepProps {
  name: string;
  children: ReactNode;
}

interface IFunnelComponent extends FC<{ children: ReactNode[] }> {
  Step: FC<IStepProps>;
}

export function useFunnel<T>(initialState: T) {
  const [step, setStep] = useState<T>(initialState);

  const Step: FC<IStepProps> = ({ children }) => {
    return <>{children}</>;
  };

  const Funnel: IFunnelComponent = ({ children }) => {
    const currentStep = children.find(
      (childStep) => isValidElement(childStep) && childStep.props.name === step
    );

    return <>{currentStep}</> || <></>;
  };

  Funnel.Step = Step;
  return [Funnel, step, setStep] as const;
}
