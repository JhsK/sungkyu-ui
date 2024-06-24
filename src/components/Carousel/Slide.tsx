import { ReactNode } from "react";
import styled from "styled-components";
import { SizeType } from "../../../styles/types";
import { useCarousel } from "./useCarousel";

interface ICarouselSlideProps {
  children: ReactNode;
  handleClick?: () => void;
}

function CarouselSlide({ children, handleClick }: ICarouselSlideProps) {
  const { width, isDragging } = useCarousel();

  const handleClickCarouselSlide = () => {
    if (isDragging) return;
    handleClick?.();
  };

  return (
    <Li $width={width} onClick={handleClickCarouselSlide}>
      {children}
    </Li>
  );
}

const Li = styled.li<{ $width: Extract<SizeType, `${number}px`> }>`
  width: ${(props) => props.$width};
  flex-shrink: 0;
  user-select: none;
  cursor: pointer;
`;

export default CarouselSlide;
