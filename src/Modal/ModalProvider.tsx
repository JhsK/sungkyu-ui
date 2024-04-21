import { useState } from "react";
import ModalContext from "./ModalContext";
import ModalContainer from "./ModalContainer";
import ModalController from "./ModalController";

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const flagState = useState<number>(1);
  const [modalController] = useState(() => new ModalController(flagState));

  return (
    <ModalContext.Provider value={modalController}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  );
}
