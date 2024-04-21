/* eslint-disable @typescript-eslint/no-unused-vars */

import { FlagStateType, IModalInfo } from "./types";

export default class ModalController {
  private flagState;
  private modalInfos: IModalInfo[] = [];

  constructor(flagState: FlagStateType) {
    this.flagState = flagState;
  }

  private flush() {
    const [_, setFlag] = this.flagState;
    setFlag((prev) => prev + 1);
  }

  private handlePromise({
    key,
    resolver,
    value,
  }: {
    key: string;
    resolver: (value: unknown) => void;
    value: unknown;
  }) {
    resolver(value);
    this.modalInfos = this.modalInfos.filter((info) => info.key !== key);
    this.flush();
  }

  get top() {
    return this.modalInfos[this.modalInfos.length - 1];
  }

  async push({
    key,
    Component,
    props,
  }: Omit<IModalInfo, "resolve" | "reject">) {
    return await new Promise((resolve, reject) => {
      this.modalInfos.push({
        key,
        Component,
        props,
        resolve: (value) =>
          this.handlePromise({ key, resolver: resolve, value }),
        reject: (reason) =>
          this.handlePromise({ key, resolver: reject, value: reason }),
      });
      this.flush();
    });
  }

  pop() {
    this.top?.reject(`Close modal ${this.top.key}`);
    this.modalInfos.pop();
    this.flush();
  }

  clear() {
    while (this.top) this.pop();
  }
}
