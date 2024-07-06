/* eslint-disable @typescript-eslint/no-explicit-any */
type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<SetStateAction> = (value: SetStateAction) => void;

export type FlagStateType = [number, Dispatch<SetStateAction<number>>];

export interface IDefaultModalProps {
  handleCloseModal: () => void;
}

export interface IModalInfo extends IDefaultModalProps {
  key: string;
  Component: React.FC<any>;
  props: any;
  handleClickOutSideCallback?: () => void;
}
