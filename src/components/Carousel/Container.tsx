import { Children, ReactNode, cloneElement, isValidElement } from "react";
import styled from "styled-components";
import { SizeType } from "../../../styles/types";
import useHandleEvent from "./hooks/useHandleEvent";
import { useCarousel } from "./useCarousel";

interface ICarouselContainerProps {
  children: ReactNode;
}

interface SlideContainerProps {
  $slideIndex: number;
  $translateX: number;
  $childrenLength: number;
  $width: Extract<SizeType, `${number}px`>;
  $gap: Extract<SizeType, `${number}px`>;
  $transitionEnabled: boolean;
}

function CarouselContainer({ children }: ICarouselContainerProps) {
  const { width, gap, setIsDragging } = useCarousel();
  const childrenArray = Children.toArray(children);

  const cloneIfElement = (child: ReactNode, key: string): ReactNode => {
    return isValidElement(child) ? cloneElement(child, { key }) : child;
  };

  const extendedChildren = [
    cloneIfElement(childrenArray[childrenArray.length - 1], "last-clone"),
    ...childrenArray,
    cloneIfElement(childrenArray[0], "first-clone"),
  ];
  const childrenCount = extendedChildren.length;

  const {
    currentSlide,
    translateX,
    transitionEnabled,
    handleStart,
    handleMove,
    handleEnd,
  } = useHandleEvent({ childrenCount, setIsDragging });

  return (
    <StyledCarouselContainer
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <SlideContainer
        $slideIndex={currentSlide}
        $translateX={translateX}
        $childrenLength={childrenCount}
        $width={width}
        $gap={gap}
        $transitionEnabled={transitionEnabled}
      >
        {extendedChildren}
      </SlideContainer>
    </StyledCarouselContainer>
  );
}

const StyledCarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  width: 100%;
`;

const SlideContainer = styled.ul.attrs<SlideContainerProps>(
  ({
    $slideIndex,
    $translateX,
    $childrenLength,
    $width,
    $gap,
    $transitionEnabled,
  }) => {
    const widthNumber = parseInt($width, 10);
    const gapNumber = parseInt($gap, 10);
    const calculateGotoSlide = $slideIndex * (widthNumber + gapNumber);
    const calculateMinWidth =
      widthNumber * $childrenLength + gapNumber * ($childrenLength - 1);

    return {
      style: {
        transform: `translateX(calc(-${calculateGotoSlide}px + ${$translateX}px + 50% - ${
          widthNumber / 2
        }px))`,
        minWidth: `calc(${calculateMinWidth})`,
        transition: $transitionEnabled ? "transform 0.5s ease" : "none",
      },
    };
  }
)<SlideContainerProps>`
  display: flex;
  gap: ${(props) => props.$gap};
`;

export default CarouselContainer;
