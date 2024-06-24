import { ReactNode } from "react";
import CarouselContainer from "./Container";
import CarouselSlide from "./Slide";
import { ICarouselState } from "./context";
import { CarouselProvider } from "./provider";

interface ICarouselContextContainerProps
  extends Pick<ICarouselState, "width" | "gap"> {
  children: ReactNode;
}

const CarouselContextContainer = ({
  width,
  gap,
  children,
}: ICarouselContextContainerProps) => {
  return (
    <CarouselProvider width={width} gap={gap}>
      <CarouselContainer>{children}</CarouselContainer>
    </CarouselProvider>
  );
};

export const Carousel = Object.assign(CarouselContextContainer, {
  Slide: CarouselSlide,
});
