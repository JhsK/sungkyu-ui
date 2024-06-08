import { styled } from "styled-components";
import { FlexCol } from "../../styles/flex";
import { HeightType, WidthType } from "../../styles/types";

interface IEmptyProps {
  message: string;
  minWidth?: WidthType;
  minHeight?: HeightType;
}

function Empty({
  message,
  minWidth = "100%",
  minHeight = "400px",
}: IEmptyProps) {
  return (
    <EmptyContainer $minWidth={minWidth} $minHeight={minHeight}>
      {message}
    </EmptyContainer>
  );
}

const EmptyContainer = styled(FlexCol)<{
  $minWidth: WidthType;
  $minHeight: HeightType;
}>`
  min-width: ${(props) => props.$minWidth};
  min-height: ${(props) => props.$minHeight};
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

export default Empty;
