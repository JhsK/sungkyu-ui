import { useEffect } from "react";
import { useModal } from "./useModal";
import ReactDOM from "react-dom";

const MODAL_ID = "modal-container";

export default function ModalContainer() {
  const modal = useModal();
  const topComponentInfo = modal.top;
  const isCanOutsideClickToClose = modal.isCanOutsideClick;

  const handleClickOutSideToClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target instanceof Element) {
      if (isCanOutsideClickToClose && e.target.id === "modal-dimmed") {
        topComponentInfo.handleClickOutSideCallback?.();
      }
    }
  };

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
      onClick={handleClickOutSideToClose}
    >
      {modal.modalInfos.map((modal) => (
        <div key={modal.key}>
          <modal.Component
            {...(modal?.props ?? {})}
            handleCloseModal={modal.handleCloseModal}
          />
        </div>
      ))}
      {/* 단일 모달일 경우 아래와 같이 표현 */}
      {/* <topComponentInfo.Component
        resolve={topComponentInfo.resolve}
        reject={topComponentInfo.reject}
        {...(topComponentInfo?.props ?? {})}
      /> */}
    </div>,
    document.getElementById(MODAL_ID) as HTMLElement
  );
}
