import { ReactNode, useState } from "react";
import { CarouselContext, ICarouselState } from "./context";

interface ICarouselProviderProps extends Pick<ICarouselState, "width" | "gap"> {
  children: ReactNode;
}

export const CarouselProvider = ({
  width,
  gap,
  children,
}: ICarouselProviderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const carouselState = { width, gap, isDragging, setIsDragging };

  return (
    <CarouselContext.Provider value={carouselState}>
      {children}
    </CarouselContext.Provider>
  );
};
