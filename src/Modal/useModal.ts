import { useContext } from "react";
import ModalContext from "./ModalContext";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Need to register Provider");

  return context;
};
