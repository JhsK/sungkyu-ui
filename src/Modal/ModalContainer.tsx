import { useEffect } from "react";
import { useModal } from "./useModal";
import ReactDOM from "react-dom";

const MODAL_ID = "modal-container";

export default function ModalContainer() {
  const modal = useModal();
  const topComponentInfo = modal.top;

  useEffect(() => {
    if (document.getElementById(MODAL_ID)) return;
    const modalDOM = document.createElement("div");
    modalDOM.id = MODAL_ID;
    document.body.append(modalDOM);
  }, []);

  if (!topComponentInfo) return <></>;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <topComponentInfo.Component
        resolve={topComponentInfo.resolve}
        reject={topComponentInfo.reject}
        {...(topComponentInfo?.props ?? {})}
      />
    </div>,
    document.getElementById(MODAL_ID) as HTMLElement
  );
}
