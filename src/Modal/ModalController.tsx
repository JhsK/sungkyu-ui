/* eslint-disable @typescript-eslint/no-unused-vars */

import { FlagStateType, IModalInfo } from "./types";

export default class ModalController {
  private flagState;
  private modalInfos: IModalInfo[] = [];
  private canOutsideClick: boolean;

  constructor(flagState: FlagStateType) {
    this.flagState = flagState;
    this.canOutsideClick = true;
  }

  private flush() {
    const [_, setFlag] = this.flagState;
    setFlag((prev) => prev + 1);
  }

  private handleClose(key: string): void {
    this.modalInfos = this.modalInfos.filter((info) => info.key !== key);
    this.flush();
  }

  // promise 형태로 모달을 열고 닫을 수 있도록 처리하려면 아래의 메소드 형태로 처리 가능
  // private handlePromise({
  //   key,
  //   resolver,
  //   value,
  // }: {
  //   key: string;
  //   resolver: (value: unknown) => void;
  //   value: unknown;
  // }) {
  //   resolver(value);
  //   this.modalInfos = this.modalInfos.filter((info) => info.key !== key);
  //   this.flush();
  // }

  get top() {
    return this.modalInfos[this.modalInfos.length - 1];
  }

  get isCanOutsideClick() {
    return this.canOutsideClick;
  }

  setCanOutsideClick(value: boolean): void {
    this.canOutsideClick = value;
    this.flush();
  }

  private hasKey(key: string) {
    return this.modalInfos.map((info) => info.key).includes(key);
  }

  push({
    key,
    Component,
    props,
    handleClickOutSideCallback,
  }: Omit<IModalInfo, "handleCloseModal">) {
    if (this.hasKey(key)) {
      throw new Error("이미 해당 key 모달이 존재합니다");
    }

    this.modalInfos.push({
      key,
      Component,
      props,
      handleClickOutSideCallback,
      handleCloseModal: () => this.handleClose(key),
    });
    this.flush();
  }

  pop() {
    this.modalInfos.pop();
    this.flush();
  }

  clear() {
    while (this.top) this.pop();
  }
}
