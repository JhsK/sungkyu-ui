import { createContext } from "react";
import { SizeType } from "../../../styles/types";

export interface ICarouselState {
  width: Extract<SizeType, `${number}px`>;
  gap: Extract<SizeType, `${number}px`>;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export const CarouselContext = createContext<ICarouselState | undefined>(
  undefined
);
